'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormFieldObject } from "./Form";

export default function MultipleField({field}: {
	field: FormFieldObject
}) {
	const [value, setValue] = useState<string>();

	const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}

	const handleRemove = (index: number) => {
		field.dispatchState((curr: any) => curr.map((item: any, i: number) => {
			if (i === index) return 'to be deleted';
			return item;
		}).filter((i: any) => i !== 'to be deleted'));
	}

	const handleAdd = () => {
		field.dispatchState((curr: any) => [...curr, value]);
		setValue('');
	}

	return <div>
		<div className="flex flex-wrap gap-2">
			{field.value.map((i: any, index: number) => <Button
				type="button"
				key={`${i}-${index}`}
				onClick={() => handleRemove(index)}
			>Remove {i}</Button>)}
		</div>
		<div className='flex flex-col gap-2'>
			<label htmlFor={field.name}>{field.label} {!field.valid && <span>This field is required</span>}</label>
			<input type={field.type ? field.type : 'text'} name={field.name} id={field.name}
				value={value || ''}
				onChange={(e) => {handleChangeField(e)}}
				className={`border border-primary/50 rounded ${field.valid ? '' : 'border-destructive'}`}
			/>
			<Button type="button" onClick={handleAdd}>Add</Button>
		</div>
	</div>
}