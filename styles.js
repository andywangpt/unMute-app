import { StyleSheet } from 'react-native'

export const buttonStyles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 1,
		padding: 1,
		height: 80,
		borderRadius: 10,
		borderColor: 'black',
		borderWidth: 1,
		shadowColor: '#000',
		shadowOffset: {
			width: 1,
			height: 2,
		},
		shadowOpacity: 0.35,
		shadowRadius: 12.84,
		elevation: 5,
	},
	buttonText: {
		color: 'black',
		fontWeight: 'bold',
		justifyContent: 'center',
		textAlign: 'center',
	},
	menuButton: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 1,
		padding: 1,
		height: 80,
		borderRadius: 10,
		borderColor: 'black',
		borderWidth: 1,
		shadowColor: '#000',
		shadowOffset: {
			width: 1,
			height: 2,
		},
		shadowOpacity: 0.35,
		shadowRadius: 22.84,
		elevation: 5,
	},
})
