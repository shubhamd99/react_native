# LocalLLM — React Native On-Device AI

A React Native learning project that runs two on-device LLM libraries **side by side** so you can compare their APIs, model formats, and developer experience in a single app.

> Everything runs **fully on-device**. No API key. No server. No internet required after the first model download.

---

## Libraries

|                        | `react-native-executorch`                       | `@react-native-ai/llama`                      |
| ---------------------- | ----------------------------------------------- | --------------------------------------------- |
| **By**                 | Software Mansion                                | Callstack                                     |
| **Runtime**            | Meta ExecuTorch                                 | llama.cpp via `llama.rn`                      |
| **Model format**       | `.pte` (ExecuTorch export)                      | `.gguf` (llama.cpp quantized)                 |
| **API style**          | React hook — `useLLM`                           | Vercel AI SDK — `generateText` / `streamText` |
| **Streaming**          | `llm.response` state updates per token          | `textStream` async iterable                   |
| **Stop generation**    | `llm.interrupt()`                               | `AbortController.abort()`                     |
| **History management** | Automatic inside the hook                       | You own the `messages[]` array                |
| **Model source**       | Pre-exported by Software Mansion (Hugging Face) | Any GGUF on Hugging Face                      |
| **iOS minimum**        | 17.0+                                           | 15.1+                                         |
| **Android minimum**    | API 26+ (33 recommended)                        | API 24+                                       |
| **New Architecture**   | Required                                        | Required                                      |

---

## Screens

### react-native-executorch (5 screens)

| Screen             | What it demonstrates                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| **Chat**           | `useLLM` + `sendMessage()` — hook manages full conversation history automatically                  |
| **Summarize**      | `useLLM` + `generate(messages[])` — one-shot bullet-point summary                                  |
| **Translate**      | `generate()` with a target-language prompt — 8 languages via a chip picker                         |
| **Code Explainer** | `generate()` with a code-focused system prompt — runs 100% offline                                 |
| **Playground**     | Editable system prompt + user message, `generate()` — for prompt engineering without history state |

### @react-native-ai/llama — Callstack (2 screens)

| Screen             | What it demonstrates                                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Llama Chat**     | `streamText` from Vercel AI SDK — tokens stream via `for await...of result.textStream` with `AbortController` cancel               |
| **Llama Generate** | `generateText` from Vercel AI SDK — full response + `usage.inputTokens` / `usage.outputTokens`; tabs for Summarize, Q&A, Translate |

---

## Project Structure

```
LocalLLM/
├── App.tsx                             # Navigation root + initExecutorch() + LlamaProvider
├── src/
│   ├── context/
│   │   └── LlamaContext.tsx            # Callstack model lifecycle shared across screens
│   │                                   #   isModelDownloaded → downloadModel → getModelPath
│   │                                   #   → llama.languageModel(path) → prepare() → unload()
│   ├── screens/
│   │   ├── HomeScreen.tsx              # Side-by-side navigation hub with library comparison
│   │   │
│   │   │   ── react-native-executorch ──
│   │   ├── ChatScreen.tsx              # useLLM + sendMessage (multi-turn history)
│   │   ├── SummarizeScreen.tsx         # useLLM + generate (one-shot)
│   │   ├── TranslateScreen.tsx         # useLLM + generate (one-shot, 8 languages)
│   │   ├── CodeExplainerScreen.tsx     # useLLM + generate (one-shot)
│   │   ├── PlaygroundScreen.tsx        # useLLM + generate (stateless, custom prompts)
│   │   │
│   │   │   ── @react-native-ai/llama ──
│   │   ├── LlamaChatScreen.tsx         # streamText + async iterable + AbortController
│   │   └── LlamaGenerateScreen.tsx     # generateText + token usage counts
│   │
│   ├── components/
│   │   ├── MessageBubble.tsx           # Shared user/assistant chat bubble
│   │   ├── ModelLoader.tsx             # ExecuTorch: download % bar + ready/error badge
│   │   └── LlamaModelLoader.tsx        # Callstack: download % bar + ready/error badge
│   │
│   └── constants/
│       ├── models.ts                   # ExecuTorch model constants (SMOLLM2_1_135M, LLAMA3_2_1B…)
│       ├── llamaModels.ts              # GGUF model IDs in "owner/repo/file.gguf" format
│       └── systemPrompts.ts            # Per-task system prompts
```

---

## Getting Started

```bash
# 1. Install JS dependencies
npm install

# 2. iOS — install native pods (first time or after adding native deps)
bundle install          # only needed once
bundle exec pod install

# 3. Run
npx react-native run-android
npx react-native run-ios
```

On first launch the app downloads the default model to the device and caches it. All subsequent launches load from cache instantly.

### Requirements

| Requirement           | Value                                         |
| --------------------- | --------------------------------------------- |
| Node                  | >= 22                                         |
| React Native          | 0.84.1                                        |
| New Architecture      | Enabled (`newArchEnabled=true`)               |
| iOS deployment target | 17.0+ (executorch) / 15.1+ (llama.rn)         |
| Android min SDK       | API 26+ (API 33 recommended for executorch)   |
| Android architectures | arm64-v8a, x86_64 only (llama.rn requirement) |

---

## Packages Installed

All packages were added on top of the default React Native 0.84 scaffold.

### Install commands run

```bash
# react-native-executorch + its peer deps
npm install react-native-executorch \
            react-native-executorch-bare-resource-fetcher \
            @dr.pogodin/react-native-fs \
            @kesha-antonov/react-native-background-downloader

# @react-native-ai/llama (Callstack) + its peer deps + Vercel AI SDK
npm install @react-native-ai/llama llama.rn react-native-blob-util ai

# Navigation
npm install @react-navigation/native @react-navigation/native-stack react-native-screens
```

`react-native-safe-area-context` was already present in the default scaffold.

---

### `react-native-executorch` — `^0.8.1`

**By:** Software Mansion · [GitHub](https://github.com/software-mansion/react-native-executorch) · [Docs](https://docs.swmansion.com/react-native-executorch/)

**What it is:**
A React hook library that runs quantized LLMs on-device using Meta's [ExecuTorch](https://pytorch.org/executorch/) inference engine. Models are exported from PyTorch to the `.pte` format and pre-hosted on Hugging Face by Software Mansion. The hook manages download, local caching, loading, token streaming, and conversation history for you.

**Why it's installed:**
Powers all five ExecuTorch screens — Chat, Summarize, Translate, Code Explainer, and Playground.

**Key API:**

```ts
import {
  useLLM,
  initExecutorch,
  SMOLLM2_1_135M,
  LLAMA3_2_1B,
} from 'react-native-executorch';
import { BareResourceFetcher } from 'react-native-executorch-bare-resource-fetcher';

// Once at app start (App.tsx)
initExecutorch({ resourceFetcher: BareResourceFetcher });

// Inside a component
const llm = useLLM({ model: SMOLLM2_1_135M });
```

**State the hook returns:**

| Field              | Type                        | Description                                 |
| ------------------ | --------------------------- | ------------------------------------------- |
| `isReady`          | `boolean`                   | Model downloaded and loaded into memory     |
| `isGenerating`     | `boolean`                   | Actively producing tokens                   |
| `response`         | `string`                    | Accumulated output — updates on every token |
| `downloadProgress` | `number`                    | `0.0`–`1.0` during first-time download      |
| `error`            | `RnExecutorchError \| null` | Any load or generation error                |
| `messageHistory`   | `Message[]`                 | Full conversation (sendMessage mode only)   |

**Methods:**

| Method                                                     | Use case                                                |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| `generate(messages[])`                                     | One-shot — you pass the full messages array; no history |
| `sendMessage(text)`                                        | Multi-turn chat — hook appends to history automatically |
| `interrupt()`                                              | Stop mid-generation; model stays loaded                 |
| `configure({ chatConfig, generationConfig, toolsConfig })` | Set system prompt, temperature, tools                   |
| `deleteMessage(0)`                                         | Clear entire conversation history                       |

**Available model constants:**

```ts
import {
  SMOLLM2_1_135M, // ~300 MB — fastest, used as default in this app
  SMOLLM2_1_135M_QUANTIZED, // ~150 MB — smallest file
  SMOLLM2_1_360M, // ~500 MB
  LLAMA3_2_1B, // ~1.5 GB — good instruction following
  LLAMA3_2_3B, // ~3 GB   — best quality
  QWEN3_0_6B, // ~500 MB — strong multilingual
  QWEN3_1_7B, // ~1 GB
} from 'react-native-executorch';
// Each constant = { modelName, modelSource, tokenizerSource, tokenizerConfigSource }
// Pass any directly: useLLM({ model: LLAMA3_2_1B })
```

To switch the default model used across all ExecuTorch screens, edit `src/constants/models.ts`:

```ts
export const DEFAULT_MODEL = LLAMA3_2_1B; // change here
```

---

### `react-native-executorch-bare-resource-fetcher` — `^0.8.0`

**By:** Software Mansion · peer of `react-native-executorch`

**What it is:**
`react-native-executorch` is agnostic about _how_ models are downloaded — it accepts any `ResourceFetcherAdapter`. For **bare React Native** (non-Expo) projects this package provides `BareResourceFetcher`, which wraps `@dr.pogodin/react-native-fs` and `@kesha-antonov/react-native-background-downloader`.

> **Expo project?** Use `react-native-executorch-expo-resource-fetcher` + `ExpoResourceFetcher` instead.

**Why it's installed:**
Required to wire up model downloading in bare RN.

```ts
// App.tsx
initExecutorch({ resourceFetcher: BareResourceFetcher });
```

---

### `@dr.pogodin/react-native-fs` — `^2.38.1`

**By:** Dr. Pogodin (maintained fork of `react-native-fs`) · peer of `react-native-executorch-bare-resource-fetcher`

**What it is:**
File-system access for React Native — read, write, stat, move, unlink. Used internally by `BareResourceFetcher` to write downloaded `.pte` files to the device's document directory and verify them.

**Direct usage in this app:** None — used entirely by the bare resource fetcher under the hood.

---

### `@kesha-antonov/react-native-background-downloader` — `^4.5.4`

**By:** Kesha Antonov · peer of `react-native-executorch-bare-resource-fetcher`

**What it is:**
A background HTTP downloader for React Native. Supports resumable downloads and continues downloading even if the app is backgrounded — important for large model files (hundreds of MB).

**Direct usage in this app:** None — `BareResourceFetcher` calls it internally to download `.pte` models from Hugging Face.

---

### `@react-native-ai/llama` — `^0.12.0`

**By:** Callstack · [GitHub](https://github.com/callstackincubator/ai)

**What it is:**
Callstack's bridge between `llama.rn` (native llama.cpp) and the [Vercel AI SDK](https://sdk.vercel.ai/). It provides:

1. Storage helpers to download any GGUF model from Hugging Face and cache it locally
2. A `llama` provider object that wraps a local GGUF model as a `LanguageModelV3` — the same interface used by OpenAI, Anthropic, and Google in the Vercel AI SDK
3. `prepare()` / `unload()` for explicit device memory management

**Why it's installed:**
The key learning point of this library is that it plugs into the **Vercel AI SDK** — so the exact same `generateText` / `streamText` code that calls a cloud LLM works unchanged with a local GGUF model.

Powers `LlamaChatScreen` and `LlamaGenerateScreen`.

**Key API:**

```ts
import {
  llama, // provider: llama.languageModel(localPath) → LlamaLanguageModel
  downloadModel, // downloadModel(modelId, onProgress) → Promise<localPath>
  getModelPath, // getModelPath(modelId) → localPath (no download)
  isModelDownloaded, // isModelDownloaded(modelId) → Promise<boolean>
} from '@react-native-ai/llama';

// Model ID format: "owner/repo/filename.gguf"
const MODEL_ID =
  'Qwen/Qwen2.5-0.5B-Instruct-GGUF/qwen2.5-0.5b-instruct-q4_k_m.gguf';

// Full lifecycle
if (!(await isModelDownloaded(MODEL_ID))) {
  await downloadModel(MODEL_ID, ({ percentage }) =>
    console.log(`${percentage}%`),
  );
}
const model = llama.languageModel(getModelPath(MODEL_ID));
await model.prepare(); // loads into device memory
// ... use with generateText / streamText
await model.unload(); // free memory
```

This project wraps the lifecycle in `LlamaContext` so all Callstack screens share one prepared model:

```ts
// App.tsx
<LlamaProvider>
  <NavigationContainer>…</NavigationContainer>
</LlamaProvider>;

// Any Callstack screen
const { model, isReady } = useLlamaContext();
```

**GGUF model IDs — recommended options:**

```
ggml-org/SmolLM3-3B-GGUF/SmolLM3-Q4_K_M.gguf                           ~2 GB — best quality
Qwen/Qwen2.5-0.5B-Instruct-GGUF/qwen2.5-0.5b-instruct-q4_k_m.gguf      ~400 MB — default in this app
ggml-org/Qwen3-0.6B-GGUF/Qwen3-0.6B-Q4_K_M.gguf                        ~400 MB

Quantization guide:
  Q2_K   — smallest file, lowest quality
  Q4_K_M — recommended balance of quality and size
  Q8_0   — near-lossless, largest file
```

---

### `llama.rn` — `^0.10.1`

**By:** mybigday · [GitHub](https://github.com/mybigday/llama.rn) · peer of `@react-native-ai/llama`

**What it is:**
A React Native binding of [llama.cpp](https://github.com/ggerganov/llama.cpp) — the C++ LLaMA inference engine. This is the native layer that actually executes the GGUF model on the device CPU/GPU, handling KV cache, tokenization, and sampling.

**Direct usage in this app:** None — `@react-native-ai/llama` wraps it entirely. You interact with it only indirectly through `model.prepare()`.

**iOS note:** Uses a pre-built `rnllama.xcframework` by default — no extra Xcode compile time. Set `RNLLAMA_BUILD_FROM_SOURCE=1` in your Podfile to build from source instead.

---

### `react-native-blob-util` — `^0.24.7`

**By:** RonRadtke (maintained fork of `rn-fetch-blob`) · peer of `llama.rn`

**What it is:**
Efficient binary data transfer between JavaScript and native — used by `llama.rn` to stream large GGUF model files from disk into native memory without unnecessarily copying data through the JS bridge.

**Direct usage in this app:** None — peer dependency pulled in automatically by `llama.rn`.

---

### `ai` (Vercel AI SDK) — `^6.0.142`

**By:** Vercel · [GitHub](https://github.com/vercel/ai)

**What it is:**
A universal AI SDK that provides a consistent interface (`generateText`, `streamText`, `embedMany`, etc.) across all AI providers — cloud or local. `@react-native-ai/llama` implements the `LanguageModelV3` provider spec, so a local GGUF model is a drop-in replacement for `openai('gpt-4o')`.

**Why it's installed:**
Powers the two Callstack screens with Vercel AI SDK's two generation primitives.

**`generateText` — full response, then return:**

```ts
import { generateText } from 'ai';

const { text, usage } = await generateText({
  model, // LlamaLanguageModel from @react-native-ai/llama
  messages: [
    { role: 'system', content: 'You are a summarization expert.' },
    { role: 'user', content: `Summarize: ${article}` },
  ],
  abortSignal: controller.signal,
});

console.log(text);
console.log(usage.inputTokens, usage.outputTokens); // v6 field names
```

Best for: summarization, translation, Q&A — tasks where you want the complete answer before rendering.

**`streamText` — tokens yielded as they are generated:**

```ts
import { streamText } from 'ai';

const controller = new AbortController();
const result = streamText({
  model,
  messages,
  abortSignal: controller.signal,
});

for await (const chunk of result.textStream) {
  // AsyncIterable<string>
  setResponse(prev => prev + chunk);
}

controller.abort(); // stop at any time
```

Best for: chat UIs — the response appears word-by-word as the model produces it.

**AI SDK v5 → v6 field name changes:**

| v5                       | v6                   |
| ------------------------ | -------------------- |
| `usage.promptTokens`     | `usage.inputTokens`  |
| `usage.completionTokens` | `usage.outputTokens` |

---

### `@react-navigation/native` — `^7.2.2` + `@react-navigation/native-stack` — `^7.14.10`

**By:** React Navigation team

**What it is:**
Screen navigation for React Native. `native-stack` uses the platform's native navigation primitives (`UINavigationController` on iOS, Fragment backstack on Android) for smooth transitions, correct swipe-back gestures, and native header rendering.

**Why it's installed:**
Connects the Home hub to all 7 screens with a typed `RootStackParamList` and a consistent purple header.

---

### `react-native-screens` — `^4.24.0`

**By:** Software Mansion · peer of `@react-navigation/native-stack`

**What it is:**
Replaces React Native's JS-based screen component with true native views (`UIViewController` / `Fragment`). Required by `@react-navigation/native-stack`.

**Direct usage in this app:** None — automatically activated by react-navigation once installed.

---

## API Reference

### react-native-executorch — `useLLM` patterns

**Multi-turn chat (sendMessage):**

```ts
const llm = useLLM({ model: SMOLLM2_1_135M });

// hook manages history — each call appends a user+assistant turn
await llm.sendMessage('What is React Native?');
console.log(llm.response); // full accumulated response
llm.interrupt(); // stop at any time
llm.deleteMessage(0); // clear history
```

**One-shot generation (generate):**

```ts
// You control the messages array — no history between calls
await llm.generate([
  { role: 'system', content: 'You are a summarization expert.' },
  { role: 'user', content: `Summarize: ${text}` },
]);
console.log(llm.response);
```

**Configure before generating:**

```ts
useEffect(() => {
  if (llm.isReady) {
    llm.configure({
      chatConfig: { systemPrompt: 'You are a helpful assistant.' },
      generationConfig: { temperature: 0.7, topp: 0.9 },
    });
  }
}, [llm.isReady]);
```

**Tool calling:**

```ts
llm.configure({
  toolsConfig: {
    tools: [
      {
        type: 'function',
        function: {
          name: 'get_weather',
          description: 'Get current weather for a location',
          parameters: {
            type: 'object',
            properties: { location: { type: 'string' } },
            required: ['location'],
          },
        },
      },
    ],
    executeToolCallback: async call => {
      if (call.toolName === 'get_weather') {
        return `Sunny, 22°C in ${call.arguments.location}`;
      }
      return null;
    },
  },
});
```

---

### @react-native-ai/llama — Vercel AI SDK patterns

**Full model lifecycle:**

```ts
import {
  downloadModel,
  getModelPath,
  isModelDownloaded,
  llama,
} from '@react-native-ai/llama';

const MODEL_ID =
  'Qwen/Qwen2.5-0.5B-Instruct-GGUF/qwen2.5-0.5b-instruct-q4_k_m.gguf';

// Download once, cached forever
if (!(await isModelDownloaded(MODEL_ID))) {
  await downloadModel(MODEL_ID, ({ percentage }) => setProgress(percentage));
}

const model = llama.languageModel(getModelPath(MODEL_ID));
await model.prepare(); // allocates device memory, may take a few seconds
// use the model...
await model.unload(); // release memory when done
```

**generateText:**

```ts
const { text, usage } = await generateText({ model, messages });
// returns only when generation is complete
```

**streamText:**

```ts
const result = streamText({ model, messages, abortSignal: controller.signal });
for await (const chunk of result.textStream) {
  // called for every token as it is produced
  appendToUI(chunk);
}
```

---

## Dependency Summary

| Package                                             | Version    | Role                                                        |
| --------------------------------------------------- | ---------- | ----------------------------------------------------------- |
| `react-native-executorch`                           | `^0.8.1`   | On-device LLM via ExecuTorch — `useLLM` hook                |
| `react-native-executorch-bare-resource-fetcher`     | `^0.8.0`   | `.pte` model download + cache adapter (bare RN)             |
| `@dr.pogodin/react-native-fs`                       | `^2.38.1`  | File-system I/O (peer of above)                             |
| `@kesha-antonov/react-native-background-downloader` | `^4.5.4`   | Background HTTP download (peer of above)                    |
| `@react-native-ai/llama`                            | `^0.12.0`  | Callstack GGUF provider — download helpers + AI SDK adapter |
| `llama.rn`                                          | `^0.10.1`  | Native llama.cpp bindings (peer of above)                   |
| `react-native-blob-util`                            | `^0.24.7`  | Binary file I/O bridge (peer of `llama.rn`)                 |
| `ai`                                                | `^6.0.142` | Vercel AI SDK v6 — `generateText`, `streamText`             |
| `@react-navigation/native`                          | `^7.2.2`   | Navigation container                                        |
| `@react-navigation/native-stack`                    | `^7.14.10` | Native stack navigator                                      |
| `react-native-screens`                              | `^4.24.0`  | Native screen views (peer of react-navigation)              |
| `react-native-safe-area-context`                    | `^5.5.2`   | Safe area insets (default scaffold)                         |

---

## Common Commands

```bash
npx react-native start --reset-cache   # start Metro bundler
npx react-native run-android           # build + run on Android
npx react-native run-ios               # build + run on iOS
npx tsc --noEmit                       # TypeScript type-check
```
