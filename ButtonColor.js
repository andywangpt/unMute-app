import { buttonStyles } from './styles.js'
import { ColorThemes } from './ColorThemes.js'

export const getButtonColor = (
	category,
	pressed,
	currentThemeIndex,
) => {
	const theme = ColorThemes[currentThemeIndex]

	if (category === 'MENU') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? theme.ifPressed
					: theme.menuColor,
			},
		]
	}

	if (category === 'QUESTION_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? theme.ifPressed
					: theme.QUESTION_WORDS,
			},
		]
	}

	if (category === 'WHO_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? theme.ifPressed
					: theme.WHO_WORDS,
			},
		]
	}

	if (category === 'HOW_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? theme.ifPressed
					: theme.HOW_WORDS,
			},
		]
	}

	if (category === 'WHAT_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? theme.ifPressed
					: theme.WHAT_WORDS,
			},
		]
	}

	if (category === 'WHEN_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? theme.ifPressed
					: theme.WHEN_WORDS,
			},
		]
	}

	if (category === 'HOWMUCH_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? theme.ifPressed
					: theme.HOWMUCH_WORDS,
			},
		]
	}

	if (category === 'WHERE_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? theme.ifPressed
					: theme.WHERE_WORDS,
			},
		]
	}

	if (category === 'WHICH_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? theme.ifPressed
					: theme.WHICH_WORDS,
			},
		]
	}
	if (category === 'SOCIAL_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? theme.ifPressed
					: theme.SOCIAL_WORDS,
			},
		]
	}
	if (category === 'PATHWAY_WORDS') {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed
					? theme.ifPressed
					: theme.PATHWAY_WORDS,
			},
		]
	} else {
		return [
			buttonStyles.button,
			{
				backgroundColor: pressed ? '#f1ffff' : '#768585',
			},
		]
	}
}
