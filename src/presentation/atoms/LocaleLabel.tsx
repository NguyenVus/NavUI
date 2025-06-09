// src/components/atoms/LocaleLabel/index.tsx
import React from 'react';

interface LocaleLabelProps {
    code: string;
}

export default function LocaleLabel({ code }: LocaleLabelProps) {
    return (
        <span style={{ marginRight: 8, fontSize: 14 }}>
      {code.toUpperCase()}
    </span>
    );
}
