import { StyleSheet } from 'react-native'
import { buttonStyles } from './styles.js'

export const getButtonColor = (category, pressed) => {
	if (category === 'MENU') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? '#f1ffff'
					: '#636f6f',
			},
		]
	}

	if (category === 'QUESTION_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? '#f1ffff'
					: '#ffaa00',
			},
		]
	}

	if (category === 'WHO_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? '#f1ffff'
					: '#8a9b9b',
			},
		]
	}

	if (category === 'HOW_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? '#f1ffff'
					: '#c5dedd',
			},
		]
	}

	if (category === 'WHAT_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? '#f1ffff'
					: '#dbe7e4',
			},
		]
	}

	if (category === 'WHEN_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? '#f1ffff'
					: '#f3f8f8',
			},
		]
	}

	if (category === 'HOWMUCH_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? '#f1ffff'
					: '#dcebeb',
			},
		]
	}

	if (category === 'WHERE_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? '#f1ffff'
					: '#c5dedd',
			},
		]
	}

	if (category === 'WHICH_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? '#f1ffff'
					: '#9eb2b1',
			},
		]
	}
	if (category === 'SOCIAL_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? '#f1ffff'
					: '#768585',
			},
		]
	}
	if (category === 'PATHWAY_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? '#f1ffff'
					: '#ffeecc',
			},
		]
	} else {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? '#f1ffff'
					: '#768585',
			},
		]
	}
}
