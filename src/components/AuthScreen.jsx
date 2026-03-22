import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

async function fetchPublicConfig(baseUrl) {
  const res = await fetch(`${baseUrl.replace(/\/$/, '')}/api/auth/public-config`);
  if (!res.ok) throw new Error('Could not load auth configuration');
  return res.json();
}

export default function AuthScreen() {
  const {
    signInWithPassword,
    signUp,
    verifyEmail,
    resendVerificationEmail,
    signInWithOAuth,
    configError,
    insforge,
  } = useAuth();

  const baseUrl = import.meta.env.VITE_INSFORGE_URL ?? '';

  const [mode, setMode] = useState('signin');
  const [authConfig, setAuthConfig] = useState(null);
  const [configLoadError, setConfigLoadError] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [pendingVerifyEmail, setPendingVerifyEmail] = useState('');

  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!baseUrl) return;
    fetchPublicConfig(baseUrl)
      .then(setAuthConfig)
      .catch((e) => setConfigLoadError(e.message));
  }, [baseUrl]);

  const passwordMin = authConfig?.passwordMinLength ?? 8;
  const oauthProviders = authConfig?.oAuthProviders ?? [];

  const redirectTo = `${typeof window !== 'undefined' ? window.location.origin : ''}/`;

  const handleOAuth = useCallback(
    async (provider) => {
      setError('');
      setMessage('');
      setBusy(true);
      const { error: oErr } = await signInWithOAuth({ provider, redirectTo });
      setBusy(false);
      if (oErr) {
        setError(oErr.message ?? String(oErr));
      }
    },
    [signInWithOAuth, redirectTo]
  );

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setBusy(true);
    const { error: err } = await signInWithPassword({ email, password });
    setBusy(false);
    if (err) {
      setError(err.message ?? String(err));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (password.length < passwordMin) {
      setError(`Password must be at least ${passwordMin} characters.`);
      return;
    }
    setBusy(true);
    const { data, error: err } = await signUp({ email, password, name: name || undefined });
    setBusy(false);
    if (err) {
      setError(err.message ?? String(err));
      return;
    }
    const mustVerify =
      data?.requireEmailVerification === true ||
      (!data?.accessToken && authConfig?.requireEmailVerification === true);
    if (mustVerify) {
      setPendingVerifyEmail(email);
      setMessage('Check your email for a verification code.');
      return;
    }
    if (data?.accessToken) {
      setMessage('Account created. Welcome!');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setBusy(true);
    const { error: err } = await verifyEmail({ email: pendingVerifyEmail, otp: otp.trim() });
    setBusy(false);
    if (err) {
      setError(err.message ?? String(err));
      return;
    }
    setPendingVerifyEmail('');
    setOtp('');
  };

  const handleResend = async () => {
    if (!pendingVerifyEmail) return;
    setError('');
    setMessage('');
    setBusy(true);
    const { error: err } = await resendVerificationEmail({ email: pendingVerifyEmail });
    setBusy(false);
    if (err) {
      setError(err.message ?? String(err));
    } else {
      setMessage('A new code was sent.');
    }
  };

  if (configError) {
    return (
      <div className="auth-screen screen-enter">
        <div className="auth-card pixel-panel">
          <h1 className="auth-card__title pixel-text">Configuration</h1>
          <p className="auth-card__error">{configError}</p>
        </div>
      </div>
    );
  }

  const showVerify = Boolean(pendingVerifyEmail);

  return (
    <div className="auth-screen screen-enter">
      <div className="auth-card pixel-panel">
        <h1 className="auth-card__title pixel-text">QuestMind</h1>
        <p className="auth-card__subtitle">Sign in to continue</p>

        {configLoadError && (
          <p className="auth-card__warn" role="status">
            {configLoadError}
          </p>
        )}

        {oauthProviders.length > 0 && !showVerify && (
          <div className="auth-card__oauth">
            {oauthProviders.includes('google') && (
              <button
                type="button"
                className="auth-card__oauth-btn"
                disabled={busy || !insforge}
                onClick={() => handleOAuth('google')}
              >
                Continue with Google
              </button>
            )}
            {oauthProviders.includes('github') && (
              <button
                type="button"
                className="auth-card__oauth-btn"
                disabled={busy || !insforge}
                onClick={() => handleOAuth('github')}
              >
                Continue with GitHub
              </button>
            )}
          </div>
        )}

        {!showVerify && oauthProviders.length > 0 && (
          <p className="auth-card__divider">
            <span>or</span>
          </p>
        )}

        {showVerify ? (
          <form className="auth-card__form" onSubmit={handleVerify}>
            <p className="auth-card__hint">
              Enter the 6-digit code sent to <strong>{pendingVerifyEmail}</strong>
            </p>
            <label className="auth-card__label" htmlFor="auth-otp">
              Verification code
            </label>
            <input
              id="auth-otp"
              className="auth-card__input"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(ev) => setOtp(ev.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              required
            />
            {error && <p className="auth-card__error">{error}</p>}
            {message && <p className="auth-card__msg">{message}</p>}
            <button type="submit" className="auth-card__submit" disabled={busy || otp.length < 6}>
              {busy ? 'Verifying…' : 'Verify & continue'}
            </button>
            <button
              type="button"
              className="auth-card__link"
              disabled={busy}
              onClick={handleResend}
            >
              Resend code
            </button>
            <button
              type="button"
              className="auth-card__link"
              disabled={busy}
              onClick={() => {
                setPendingVerifyEmail('');
                setOtp('');
                setError('');
                setMessage('');
              }}
            >
              Back
            </button>
          </form>
        ) : mode === 'signin' ? (
          <form className="auth-card__form" onSubmit={handleSignIn}>
            <label className="auth-card__label" htmlFor="auth-email">
              Email
            </label>
            <input
              id="auth-email"
              className="auth-card__input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
            <label className="auth-card__label" htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              className="auth-card__input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required
            />
            {error && <p className="auth-card__error">{error}</p>}
            {message && <p className="auth-card__msg">{message}</p>}
            <button type="submit" className="auth-card__submit" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
            <button
              type="button"
              className="auth-card__link"
              onClick={() => {
                setMode('signup');
                setError('');
                setMessage('');
              }}
            >
              Create an account
            </button>
          </form>
        ) : (
          <form className="auth-card__form" onSubmit={handleSignUp}>
            <label className="auth-card__label" htmlFor="auth-name">
              Name (optional)
            </label>
            <input
              id="auth-name"
              className="auth-card__input"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label className="auth-card__label" htmlFor="signup-email">
              Email
            </label>
            <input
              id="signup-email"
              className="auth-card__input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
            <label className="auth-card__label" htmlFor="signup-password">
              Password (min {passwordMin} characters)
            </label>
            <input
              id="signup-password"
              className="auth-card__input"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required
              minLength={passwordMin}
            />
            {error && <p className="auth-card__error">{error}</p>}
            {message && <p className="auth-card__msg">{message}</p>}
            <button type="submit" className="auth-card__submit" disabled={busy}>
              {busy ? 'Creating account…' : 'Sign up'}
            </button>
            <button
              type="button"
              className="auth-card__link"
              onClick={() => {
                setMode('signin');
                setError('');
                setMessage('');
              }}
            >
              Already have an account? Sign in
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
