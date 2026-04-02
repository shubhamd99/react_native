// GGUF models downloaded from Hugging Face via @react-native-ai/llama.
// Format: "owner/repo/filename.gguf"
// Models are cached on device after the first download.
//
// HuggingFace GGUF search: https://huggingface.co/models?search=gguf
// Quantization guide:
//   Q4_K_M  — best quality/size tradeoff (recommended)
//   Q8_0    — higher quality, larger file
//   Q2_K    — smallest, lowest quality

export const LLAMA_MODEL_OPTIONS = [
  {
    id: 'smollm3_3b',
    name: 'SmolLM3 3B (Q4_K_M)',
    description: 'Best quality — recommended for Callstack demo',
    sizeMb: '~2 GB',
    modelId: 'ggml-org/SmolLM3-3B-GGUF/SmolLM3-Q4_K_M.gguf',
  },
  {
    id: 'qwen2_5_0_5b',
    name: 'Qwen 2.5 0.5B (Q4_K_M)',
    description: 'Lightest option — fastest download',
    sizeMb: '~400 MB',
    modelId: 'Qwen/Qwen2.5-0.5B-Instruct-GGUF/qwen2.5-0.5b-instruct-q4_k_m.gguf',
  },
] as const;

// Default for all Callstack screens
export const DEFAULT_LLAMA_MODEL_ID = LLAMA_MODEL_OPTIONS[1].modelId;
