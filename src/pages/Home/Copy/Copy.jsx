import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './Copy.module.scss';

const Copy = ({ text, copied, setCopied, isVisible }) => {
    return (
        <div className={styles.container}>
            {isVisible && (
                <div className={styles.wrapper}>
                    <p>{text}</p>
                    <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
                        <div className={styles.wrapperButton}>
                            <button className={styles.button}>
                                <span>Copy Text</span>
                            </button>
                        </div>
                    </CopyToClipboard>
                    {copied && <span style={{ color: 'green' }}>Text copied!</span>}
                </div>
            )}
        </div>
    );
};

export default Copy;
