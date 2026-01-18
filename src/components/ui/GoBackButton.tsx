'use client';

import { ArrowLeft } from 'lucide-react';

export function GoBackButton() {
    return (
        <button
            onClick={() => window.history.back()}
            className="btn-secondary"
        >
            <ArrowLeft size={18} />
            Go Back
        </button>
    );
}
