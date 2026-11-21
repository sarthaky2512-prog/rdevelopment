import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    message: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error.message || 'An unexpected application error occurred.',
    };
  }

  public render() {
    if (this.state.hasError) {
      let friendly = 'Something went wrong while rendering this view.';
      try {
        const parsed = JSON.parse(this.state.message);
        if (parsed?.error) {
          friendly = `Data access error: ${parsed.error}`;
        }
      } catch {
        if (this.state.message) {
          friendly = this.state.message;
        }
      }

      return (
        <div className="min-h-screen bg-[#0B0B0C] text-[#FAFAF8] flex items-center justify-center p-6">
          <div className="max-w-lg w-full border border-white/15 bg-[#141416] p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-3">
              Rdevelopmentgroup
            </p>
            <h1 className="font-display text-3xl font-semibold mb-4">
              Unable to Display View
            </h1>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              {friendly}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold tracking-wider uppercase hover:bg-[#C59B40] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
