import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-canvas text-center">
          <div className="max-w-md w-full bg-surface-card rounded-2xl p-8 border border-hairline shadow-subtle flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-light text-ink mb-2">Đã có lỗi hiển thị</h2>
            <p className="text-body text-sm mb-6">
              Hệ thống đã ghi nhận sự cố. Vui lòng tải lại trang để tiếp tục làm việc.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full py-2.5 px-6 rounded-full bg-primary text-white font-medium text-sm hover:bg-black transition-colors"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
