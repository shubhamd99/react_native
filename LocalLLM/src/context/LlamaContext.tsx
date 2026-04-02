/**
 * LlamaContext — manages the lifecycle of a @react-native-ai/llama model.
 *
 * Flow:
 *  1. downloadModel()  → downloads GGUF from HuggingFace, returns local path
 *  2. llama.languageModel(localPath) → creates LlamaLanguageModel instance
 *  3. model.prepare() → loads model into device memory (LlamaContext)
 *  4. pass model to generateText() / streamText() from 'ai'
 *  5. model.unload()  → frees memory when done
 *
 * The context keeps one model instance alive so all Callstack screens share
 * the same prepared context without re-loading on every navigation.
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import {
  downloadModel,
  getModelPath,
  isModelDownloaded,
  LlamaLanguageModel,
  llama,
} from '@react-native-ai/llama';
import { DEFAULT_LLAMA_MODEL_ID } from '../constants/llamaModels';

interface LlamaContextType {
  model: LlamaLanguageModel | null;
  modelId: string;
  isDownloading: boolean;
  downloadProgress: number; // 0–100
  isPreparing: boolean;
  isReady: boolean;
  error: string | null;
  loadModel: (id?: string) => Promise<void>;
  unloadModel: () => Promise<void>;
}

const LlamaCtx = createContext<LlamaContextType | null>(null);

export function LlamaProvider({ children }: { children: React.ReactNode }) {
  const modelRef = useRef<LlamaLanguageModel | null>(null);
  const [modelId, setModelId] = useState<string>(DEFAULT_LLAMA_MODEL_ID);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isPreparing, setIsPreparing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadModel = useCallback(async (id: string = DEFAULT_LLAMA_MODEL_ID) => {
    if (isReady && modelId === id) {
      return; // already loaded
    }

    // Unload existing model if switching
    if (modelRef.current) {
      await modelRef.current.unload().catch(() => {});
      modelRef.current = null;
      setIsReady(false);
    }

    setModelId(id);
    setError(null);

    try {
      // Step 1 — Download model if not cached
      const alreadyDownloaded = await isModelDownloaded(id);
      if (!alreadyDownloaded) {
        setIsDownloading(true);
        setDownloadProgress(0);
        await downloadModel(id, ({ percentage }) => {
          setDownloadProgress(percentage);
        });
        setIsDownloading(false);
      }

      // Step 2 — Get local path and create model instance
      const localPath = getModelPath(id);
      const model = llama.languageModel(localPath);
      modelRef.current = model;

      // Step 3 — Prepare (load into memory / init LlamaContext)
      setIsPreparing(true);
      await model.prepare();
      setIsPreparing(false);
      setIsReady(true);
    } catch (e) {
      setIsDownloading(false);
      setIsPreparing(false);
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [isReady, modelId]);

  const unloadModel = useCallback(async () => {
    if (modelRef.current) {
      await modelRef.current.unload().catch(() => {});
      modelRef.current = null;
    }
    setIsReady(false);
    setDownloadProgress(0);
  }, []);

  return (
    <LlamaCtx.Provider
      value={{
        model: modelRef.current,
        modelId,
        isDownloading,
        downloadProgress,
        isPreparing,
        isReady,
        error,
        loadModel,
        unloadModel,
      }}>
      {children}
    </LlamaCtx.Provider>
  );
}

export function useLlamaContext(): LlamaContextType {
  const ctx = useContext(LlamaCtx);
  if (!ctx) {
    throw new Error('useLlamaContext must be used inside <LlamaProvider>');
  }
  return ctx;
}
