import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FormFieldObject } from "./Form";

export default function SelectField({field}: {
	field: FormFieldObject
}) {
	return <div className="flex gap-4 items-center flex-wrap md:flex-nowrap">
	{field.label.length > 0 && <span>{field.label}:</span>}
	<Select
		value={field.value}
		onValueChange={field.dispatchState}
	>
		<SelectTrigger>
			<SelectValue placeholder={field.selectPlaceholder ? field.selectPlaceholder : undefined} />
		</SelectTrigger>
		<SelectContent>
			{field.selectOptions?.map(option => <SelectItem key={option.value} value={option.value}>{option.text}</SelectItem>)}
		</SelectContent>
	</Select>
</div>
}