import type { MetaSession } from '@bitvavo/react-native-sdk';
import { SamplingDecision } from '@opentelemetry/sdk-trace-web';

export function getSamplingDecision(sessionMeta: MetaSession = {}): SamplingDecision {
  const isSessionSampled = sessionMeta.attributes?.['isSampled'] === 'true';
  const samplingDecision = isSessionSampled ? SamplingDecision.RECORD_AND_SAMPLED : SamplingDecision.NOT_RECORD;

  return samplingDecision;
}
