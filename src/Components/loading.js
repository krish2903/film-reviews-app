import styles from './loading.module.css';
import React from 'react';

export default function LoadingScreen() {
    return (
        <div className={styles.loadContainer}>
            <h1>YOUR LOGO</h1>
            <div className={styles.loader}></div>
        </div>
    );
}
