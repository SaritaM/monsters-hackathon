'use client'

import { useEffect, useState } from "react"
import styles from './RollIn.module.scss';
import { cn } from "@/lib/utils";

export default function RollIn({triggerDisplay, children, className = ''}: {
	triggerDisplay: React.ComponentState,
	children: React.ReactNode,
	className?: string
}) {
	const [isShownData, setIsShownData] = useState<boolean>(false);
	const [isDisplayData, setIsDisplayData] = useState<boolean>(false);

	useEffect(() => {
		if (triggerDisplay) {
			setIsShownData(true);
		} else {
			setIsShownData(false);
		}
	}, [triggerDisplay]);

	useEffect(() => {
		if (isShownData) {
			setIsDisplayData(true);
			setTimeout(() => {
				setIsDisplayData(true);
			}, 500)
		} else {
			setTimeout(() => {
				setIsDisplayData(false);
			}, 500)
		}
	}, [isShownData]);

	return <div className={cn(`${styles.container} ${isShownData ? styles.show : ''}`, className)}>
		<div className={cn(styles.innerContainer, 'flex flex-col')}>
			{isDisplayData && <div className={cn(styles.content, 'flex flex-col flex-grow')}>
				{children}
			</div>}
		</div>
	</div>
}