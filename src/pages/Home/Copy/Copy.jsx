import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Copy = ({ text, copied, setCopied, isVisible }) => {
    return (
        <div>
            {isVisible && (
                <div>
                    <p>{text}</p>
                    <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
                        <button>Copy Text</button>
                    </CopyToClipboard>
                    {copied && <span style={{ color: 'green' }}>Text copied!</span>}
                </div>
            )}
        </div>
    );
};

export default Copy;
