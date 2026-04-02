import {
  SMOLLM2_1_135M,
  SMOLLM2_1_135M_QUANTIZED,
  SMOLLM2_1_360M,
  LLAMA3_2_1B,
  LLAMA3_2_3B,
} from 'react-native-executorch';

// Pre-exported models hosted by Software Mansion on Hugging Face.
// The model constant contains { modelName, modelSource, tokenizerSource, tokenizerConfigSource }.
// Pass any of these directly to useLLM({ model: <constant> }).

export const MODEL_OPTIONS = [
  {
    id: 'smollm2_135m',
    name: 'SmolLM 2.1 135M (BF16)',
    description: 'Fastest — great for demos',
    ramRequired: '~300 MB',
    model: SMOLLM2_1_135M,
  },
  {
    id: 'smollm2_135m_q',
    name: 'SmolLM 2.1 135M (Quantized)',
    description: 'Smallest file size',
    ramRequired: '~150 MB',
    model: SMOLLM2_1_135M_QUANTIZED,
  },
  {
    id: 'smollm2_360m',
    name: 'SmolLM 2.1 360M',
    description: 'Balanced quality/speed',
    ramRequired: '~500 MB',
    model: SMOLLM2_1_360M,
  },
  {
    id: 'llama3_2_1b',
    name: 'Llama 3.2 1B',
    description: 'Best instruction following',
    ramRequired: '~1.5 GB',
    model: LLAMA3_2_1B,
  },
  {
    id: 'llama3_2_3b',
    name: 'Llama 3.2 3B',
    description: 'Highest quality',
    ramRequired: '~3 GB',
    model: LLAMA3_2_3B,
  },
] as const;

// Default model used across all screens — smallest for fastest demo
export const DEFAULT_MODEL = SMOLLM2_1_135M;
