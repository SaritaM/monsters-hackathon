'use client'
import { useState } from 'react';
import styles from './Form.module.scss';
import { Button } from '@/components/ui/button';
import FormField from './FormField';
import RollIn from '@/components/RollIn/RollIn';
import { DialogFooter } from '../ui/dialog';

export interface FormValidationObject {
	validState: React.ComponentState,
	setValidState: React.Dispatch<React.SetStateAction<boolean>>,
	test: boolean
}

export class FormValidationObject {
	validState: React.ComponentState;
	setValidState: React.Dispatch<React.SetStateAction<boolean>>;
	test: boolean;
	constructor(
		validState: React.ComponentState,
		setValidState: React.Dispatch<React.SetStateAction<boolean>>,
		test: boolean
	){
		this.validState = validState;
		this.setValidState = setValidState;
		this.test = test;
	}
}

export interface FormFieldObject {
	label: string,
	name: string,
	value: React.ComponentState,
	dispatchState: React.Dispatch<React.SetStateAction<any>>,
	validation: FormValidationObject | undefined,
	valid: boolean,
	type?: 'password' | 'checkbox' | 'select' | 'date-pick' | 'rich-text' | 'multiple',
	selectOptions?: FormFieldSelectObject[],
	selectPlaceholder?: string,
	conditionalRender?: boolean,
	conditionalRenderCase?: boolean
}

export class FormFieldObject {
	label: string;
	name: string;
	value: React.ComponentState;
	dispatchState: React.Dispatch<React.SetStateAction<any>>;
	validation: FormValidationObject | undefined;
	valid: boolean;
	type?: 'password' | 'checkbox' | 'select' | 'date-pick' | 'rich-text' | 'multiple';
	selectOptions?: FormFieldSelectObject[];
	selectPlaceholder?: string;
	conditionalRender?: boolean;
	conditionalRenderCase?: boolean;
	constructor(
		label: string,
		name: string,
		value: React.ComponentState,
		dispatchState: React.Dispatch<React.SetStateAction<any>>,
		validation: FormValidationObject | undefined,
		valid: boolean,
		type?: 'password' | 'checkbox' | 'select' | 'date-pick' | 'rich-text' | 'multiple',
		selectOptions?: FormFieldSelectObject[],
		selectPlaceholder?: string,
		conditionalRender?: boolean,
		conditionalRenderCase?: boolean
	){
		this.label = label;
		this.name = name;
		this.value = value;
		this.dispatchState = dispatchState;
		this.validation = validation;
		this.valid = valid;
		this.type = type;
		this.selectOptions = selectOptions;
		this.selectPlaceholder = selectPlaceholder;
		this.conditionalRender = conditionalRender;
		this.conditionalRenderCase = conditionalRenderCase;
	}
}

export interface FormFieldSelectObject {
	value: string,
	text: string
}

export class FormFieldSelectObject {
	value: string;
	text: string;
	constructor(
		value: string,
		text: string
	){
		this.value = value;
		this.text = text;
	}
}

export default function Form({preText, postText, formFields, onSubmit, customSuccessMsg, initialTimeState, buttonText = 'Submit', onCancel}: {
	preText?: string,
	postText?:string | React.ReactNode,
	formFields: Array<FormFieldObject>,
	onSubmit: Function,
	customSuccessMsg?: string,
	initialTimeState?: Date,
	buttonText?: string,
	onCancel: Function,
}) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	const [honey, setHoney] = useState<string | undefined>();

	const validateField = (field: React.ComponentState, validationObj: FormValidationObject | undefined) => {
		if (validationObj !== undefined) {
			if (field && validationObj.test) {
				validationObj.setValidState(true);
				return true;
			} else {
				validationObj.setValidState(false);
				return false;
			}
		} else {
			return true;
		}
	}

	const validateAll = () => {
		if (formFields.filter(field => field.validation !== undefined && !field.validation.test).length > 0) {
			formFields.map(field => {
				validateField(field, field.validation);
			});
			return false;
		} else {
			return true;
		}
	}

	const handleChangeHoney = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHoney(e.target.value);
	}

	const validateHoney = () => {
		if (honey && honey.length > 0) {
			return false;
		} else {
			return true;
		}
	}

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setIsLoading(true);
		if (validateAll() && validateHoney()) {
			try {
				onSubmit();
			} catch (error: any) {
				console.log(error);
				setError(error.message);
				setIsLoading(false);
				setIsError(true);
			}
		} else {
			// failed validation
			setIsLoading(false);
		}
	}
	return <>
		<form className={styles.container} onSubmit={handleSubmit}>
			{isLoading && <div className='absolute inset-0 bg-white/90 text-2xl flex items-center justify-center z-10'>Loading...</div>}
			{isSuccess && <div className='absolute inset-0 bg-white/90 text-2xl flex items-center justify-center z-10'>{customSuccessMsg ? customSuccessMsg : 'Success!'}</div>}
			{isError && <div className='absolute inset-0 bg-white/90 text-2xl flex items-center justify-center z-10'>{error}</div>}
			{preText && <span>{preText}</span>}
			<div className={styles.fields}>
				{formFields.map(field => {
					if (!field.conditionalRender) return <FormField
						key={field.name}
						field={field}
						validateField={validateField}
					/>
					return <RollIn
						triggerDisplay={field.conditionalRenderCase}
						key={field.name}
					>
						<FormField
							field={field}
							validateField={validateField}
						/>
					</RollIn>
				})}
				<div className={styles.honey} aria-hidden='true'>
					<div className={styles.field}>
						<label htmlFor="honey">Secondary</label>
						<input type="text" name="honey" id="honey"
							value={honey || ''}
							onChange={handleChangeHoney}
						/>
					</div>
				</div>
			</div>
			{/* <Button type="submit">{buttonText}</Button> */}
			{postText && <div>{postText}</div>}
		</form>
		<DialogFooter>
			<Button variant={'secondary'} onClick={() => onCancel()}>Cancel</Button>
			<Button onClick={handleSubmit}>Save Bounty</Button>
		</DialogFooter>
	</>
}