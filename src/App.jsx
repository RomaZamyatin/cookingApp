import { useState } from 'react';
import styles from './App.module.css'
import data from './data.json';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps] = useState(data)
	const [activeIndex,setActiveIndex] = useState (0)
	//флаги конечного и начального шага
	let onfirstStep = true;
	let onLastStep = false;

	activeIndex == 6 ? onLastStep = true: onfirstStep = false
	activeIndex == 0 ? onfirstStep = true: onfirstStep = false

	//обработка клика 'Далее'
	const handleForwardClick = () => {
		if (!onLastStep){
			setActiveIndex(activeIndex + 1)
		}
	}
	//обработка клика 'Назад'
	const handleBackClick = () => {
		if(!onfirstStep){
			setActiveIndex(activeIndex - 1)
		}
	}
	//обработка клика 'Начать сначала'
	const handleOnBeginClick = ()=>{
		setActiveIndex(0)
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({id,title},index)=>
						<li className={`
							${styles['steps-item']}
							${index<=activeIndex? styles.done:''}
							${index===activeIndex ? styles.active:''}`}
							key={id}>
							<button className={styles['steps-item-button']} onClick={()=>{setActiveIndex(index)}}>{index+1}</button>
							{title}
						</li>)}
					</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button} onClick={handleBackClick} disabled={onfirstStep}>Назад</button>
						{onLastStep?
						<button className={styles.button} onClick={handleOnBeginClick}>Начать сначала</button>:
						<button className={styles.button} onClick={handleForwardClick}>Далее</button>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
