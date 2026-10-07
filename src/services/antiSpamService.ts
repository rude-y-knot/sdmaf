/**
 * Anti-Spam & Rate Limiting Defense Layer
 * 
 * Features:
 * 1. Honeypot check (hidden fields filled by automated spam bots)
 * 2. Form submission speed check (submissions under 2.0s are automated bots)
 * 3. Client cooldown / rate-limiting (prevents flood attacks & rapid clicking)
 */

const COOLDOWN_SECONDS = 30;
const STORAGE_KEY = 'sdmaf_last_form_submission_ts';

export interface AntiSpamCheckOptions {
  honeypotValue?: string;
  formStartTime?: number;
  captchaToken?: string;
}

export interface AntiSpamResult {
  allowed: boolean;
  reason?: string;
  waitRemainingSeconds?: number;
}

/**
 * Validates whether the submission is legitimate or automated spam
 */
export function validateAntiSpam({
  honeypotValue,
  formStartTime,
  captchaToken,
}: AntiSpamCheckOptions): AntiSpamResult {
  // 1. Honeypot check: If the hidden honeypot trap field is filled, it's a bot
  if (honeypotValue && honeypotValue.trim().length > 0) {
    return {
      allowed: false,
      reason: 'Автоматическое заполнение формы (Honeypot)',
    };
  }

  // 2. Submission timing check: Humans cannot realistically fill a full form in < 1.5 seconds
  if (formStartTime && Date.now() - formStartTime < 1500) {
    return {
      allowed: false,
      reason: 'Подозрительно высокая скорость заполнения (Bot Speed)',
    };
  }

  // 3. Rate limiting / Cooldown check
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const lastSubmitStr = window.sessionStorage.getItem(STORAGE_KEY);
      if (lastSubmitStr) {
        const lastSubmitTs = parseInt(lastSubmitStr, 10);
        const elapsedSeconds = Math.floor((Date.now() - lastSubmitTs) / 1000);
        if (elapsedSeconds < COOLDOWN_SECONDS) {
          return {
            allowed: false,
            reason: `Слишком частые запросы. Пожалуйста, подождите перед отправкой.`,
            waitRemainingSeconds: COOLDOWN_SECONDS - elapsedSeconds,
          };
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  return { allowed: true };
}

/**
 * Records successful submission timestamp to enforce cooldown
 */
export function recordSubmissionTimestamp() {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {
      // Ignore
    }
  }
}
