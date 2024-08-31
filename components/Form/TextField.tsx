import { cn } from "@/lib/utils";
import { FormFieldObject, FormValidationObject } from "./Form";

export default function TextField({field, validateField, orientation = 'vertical'}: {
	field: FormFieldObject,
	validateField?: (field: React.ComponentState, validationObj: FormValidationObject | undefined) => boolean,
	orientation?: 'vertical' | 'horizontal'
}) {
	return <div className={cn('flex flex-col gap-2', orientation === 'horizontal' ? 'lg:flex-row' : '')}>
		<label htmlFor={field.name}>{field.label} {!field.valid && <span>This field is required</span>}</label>
		<input type={field.type ? field.type : 'text'} name={field.name} id={field.name}
			value={field.value || ''}
			onChange={(e) => field.dispatchState(e.target.value)}
			onBlur={() => {if (validateField) validateField(field, field.validation)}}
			className={cn('border border-primary/50 rounded', orientation === 'horizontal' ? 'flex-grow' : '', field.valid ? '' : 'border-destructive')}
		/>
	</div>
}