import React from 'react';
import styles from './loading-circle.module.scss';

const LoadingCircle = () => {
    return (
        <div className={styles.root}>
            <span className={styles.loader}/>
        </div>
    )
}

export default LoadingCircle;