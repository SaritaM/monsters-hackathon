import { Checkbox } from "@/components/ui/checkbox"
import DatePick from "./DatePick"
import { FormFieldObject, FormValidationObject } from "./Form"
import MultipleField from "./MultipleField"
import Tiptap from "./Tiptap"
import SelectField from "./SelectField"
import TextField from "./TextField"

export default function FormField({field, validateField}: {
	field: FormFieldObject,
	validateField: (field: React.ComponentState, validationObj: FormValidationObject | undefined) => boolean
}){
	if (field.type === 'checkbox') {
		return <div className="flex items-center gap-2">
			<Checkbox
				checked={field.value}
				onCheckedChange={field.dispatchState}
			/>
			<span>{field.label}</span>
		</div>
	}
	if (field.type === 'select') {
		return <SelectField field={field} />
	}
	if (field.type === 'date-pick') {
		return <DatePick
			field={field}
			key={field.name}
		/>
	}
	if (field.type === 'rich-text') {
		return <div key={field.label} className='flex flex-col gap-2'>
			<span>{field.label}</span>
			<Tiptap
				content={field.value}
				setContent={field.dispatchState}
			/>
		</div>
	}
	if (field.type === 'multiple') {
		return <MultipleField field={field} />
	}
	return <TextField
		field={field}
		validateField={validateField}
	/>
}