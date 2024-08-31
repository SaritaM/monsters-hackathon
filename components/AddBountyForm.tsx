'use client'

import { useState } from "react"
import Form, { FormFieldObject, FormFieldSelectObject, FormValidationObject } from "./Form/Form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AddBountyForm({onCancel, onSuccess}: {
	onCancel: Function,
	onSuccess: Function
}) {
	const saveBounty = useMutation(api.bounty.save);
	const [monster, setMonster] = useState<string>('swamp');
	const [location, setLocation] = useState<string>('');
	const [dateSpotted, setDateSpotted] = useState<Date>(new Date());
	const [reward, setReward] = useState<string>('');
	const [isValidLocation, setIsValidLocation] = useState<boolean>(true);
	const [isValidReward, setIsValidReward] = useState<boolean>(true);

	const validateString = (data: any): boolean => {
		if (!data) return false;
		if (data.length < 1) return false;
		return true;
	};

	const validateReward = (data: any): boolean => {
		if (!data) return false;
		if (Number(data) < 1) return false;
		return true;
	}

	const monsterTypes = [
		new FormFieldSelectObject('swamp', 'Swamp Thing'),
		new FormFieldSelectObject('wraith', 'Wraith'),
		new FormFieldSelectObject('banshee', 'Banshee'),
		new FormFieldSelectObject('chimera', 'Chimera'),
		new FormFieldSelectObject('unknown', 'Unknown')
	];

	const formFields = [
		new FormFieldObject('Monster Type', 'monster', monster, setMonster, undefined, true, 'select', monsterTypes),
		new FormFieldObject('Location (city, state/providence, country)', 'location', location, setLocation, new FormValidationObject(isValidLocation, setIsValidLocation, validateString(location)), isValidLocation),
		new FormFieldObject('Reward', 'reward', reward, setReward, new FormValidationObject(isValidReward, setIsValidReward, validateReward(reward)), isValidReward)
	];

	// required for usual Form component which has been copied from a past project,
	// not used in this project
	const onSubmit = async () => {
		await saveBounty({
			monster,
			location,
			dateSpotted: new Date().toDateString(),
			reward: Number(reward)
		});
		onSuccess();
	}

	return <Form
		formFields={formFields}
		onSubmit={onSubmit}
		onCancel={onCancel}
	/>
}