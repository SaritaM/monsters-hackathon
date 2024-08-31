import { CalendarIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, isBefore, setHours, setMinutes, subDays } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormFieldObject } from "./Form";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DatePick({field, initialTimeState}: {
	field: FormFieldObject,
	initialTimeState?: Date
}){
	const hoursSelection = [
		'12 am',
		'1 am',
		'2 am',
		'3 am',
		'4 am',
		'5 am',
		'6 am',
		'7 am',
		'8 am',
		'9 am',
		'10 am',
		'11 am',
		'12 pm',
		'1 pm',
		'2 pm',
		'3 pm',
		'4 pm',
		'5 pm',
		'6 pm',
		'7 pm',
		'8 pm',
		'9 pm',
		'10 pm',
		'11 pm',
	];

	const minsSelect = [
		'00',
		'15',
		'30',
		'45'
	];

	const calcInitMinsState = () => {
		const mins = new Date(initialTimeState!).getMinutes();
		if (mins < 15) return minsSelect[0];
		if (mins < 30) return minsSelect[1];
		if (mins < 45) return minsSelect[2];
		return minsSelect[3];
	}

	const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
	const [hrs, setHrs] = useState<string | undefined>(initialTimeState && hoursSelection[new Date(initialTimeState).getHours()]);
	const [mins, setMins] = useState<string | undefined>(initialTimeState && calcInitMinsState());

	const calcHoursNumber = (hour: string): number => {
		const hourArr = hour.split(' ');
		if (hourArr[1] === 'am') {
			if (hourArr[0] === '12') return 0;
			else return Number(hourArr[0]);
		} else {
			if (hourArr[0] === '12') return 12;
			else return (Number(hourArr[0]) + 12);
		}
	}

	const handleSetHours = (hours: string, dateValue: Date | undefined, setState: React.Dispatch<React.SetStateAction<Date>>) => {
		if (dateValue) setState(curr => setHours(curr, calcHoursNumber(hours)));
		setHrs(hours);
	}

	const handleSetMinutes = (minutes: string, dateValue: Date | undefined, setState: React.Dispatch<React.SetStateAction<Date>>) => {
		if (dateValue) setState(curr => setMinutes(curr, Number(minutes)));
		setMins(minutes);
	}

	const handleSetDate = (day: Date | undefined, setState: React.Dispatch<React.SetStateAction<Date | undefined>>) => {
		let dayToSet = day ? day : new Date();
		if (hrs) dayToSet = setHours(dayToSet, calcHoursNumber(hrs));
		if (mins) dayToSet = setMinutes(dayToSet, Number(mins));
		setState(dayToSet);
		setIsOpenCalendar(false);
	}

	return <div className='flex flex-col gap-6'>
		<div className="flex gap-4 flex-wrap md:flex-nowrap items-center">
			<span>{field.label}:</span>
			<Popover
				open={isOpenCalendar}
				onOpenChange={setIsOpenCalendar}
			>
				<PopoverTrigger>
					<Button asChild variant={"ghost"} className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1" aria-label="Click to select date">
						<div className="flex items-center gap-4">
							<span>{field.value && format(field.value, 'PPP')}</span>
							<div className="w-4" aria-hidden='true'>
								<CalendarIcon color="hsl(var(--primary))" />
							</div>
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<Calendar
						mode="single"
						selected={field.value}
						onSelect={(e) => handleSetDate(e, field.dispatchState)}
						className="rounded-md"
						disabled={(date) =>
							isBefore(date, subDays(new Date(), 1))
						}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</div>
		<div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
			<span>Time:</span>
			<div className="flex gap-4 items-center">
				<Select
					value={hrs}
					onValueChange={(e) => handleSetHours(e, field.value, field.dispatchState)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Hour" />
					</SelectTrigger>
					<SelectContent>
						{hoursSelection.map(hour => <SelectItem key={hour} value={hour}>{hour}</SelectItem>)}
					</SelectContent>
				</Select>
				<span>:</span>
				<Select
					value={mins}
					onValueChange={(e) => handleSetMinutes(e, field.value, field.dispatchState)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Mins" />
					</SelectTrigger>
					<SelectContent>
						{minsSelect.map(mins => <SelectItem key={mins} value={mins}>{mins}</SelectItem>)}
					</SelectContent>
				</Select>
			</div>
		</div>
	</div>
}