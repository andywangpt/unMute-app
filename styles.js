import { StyleSheet } from 'react-native'

export const buttonStyles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 1,
		padding: 1,
		width: '8.18%',
		height: 80,
		borderRadius: 10,
		borderColor: 'black',
		borderWidth: 1,
		// backgroundColor: '#636f6f',
		//MECH #636f6f
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
		width: '99%',
		height: 80,
		borderRadius: 10,
		borderColor: 'black',
		borderWidth: 1,
	}
})
