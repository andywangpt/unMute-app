import React from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from 'react-native'

const MenuTopRow = ({
	handleHomeButtonPress,
	handleHelloButtonPress,
	dictateText,
	displayText,
	getDynamicFontSize,
	deleteLastWord,
	clearDisplayText,
}) => {
	return (
		<View style={styles.xStack}>
			<TouchableOpacity
				onPress={handleHomeButtonPress}
				style={styles.menuButton}
			>
				<Text style={styles.buttonText}>🏠</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.menuButton}
				onPress={handleHelloButtonPress}
			>
				<Text style={styles.buttonText}>👋🏼</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.displayStyle}
				onPress={dictateText}
			>
				<Text
					style={[
						{
							fontSize: getDynamicFontSize(displayText),
						},
					]}
				>
					{displayText}
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.menuButton}
				onPress={deleteLastWord}
			>
				<Text style={styles.buttonText}>⬅️</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.menuButton}
				onPress={clearDisplayText}
			>
				<Text style={styles.buttonText}>X</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={handleHomeButtonPress}
				style={styles.menuButton}
			>
				<Text style={styles.buttonText}>🏠</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	xStack: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
      // padding: 1,
      margin: 1,
      marginBottom: 0,
		backgroundColor: '#2e3a43',
	},
	menuButton: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 1,
		padding: 0,
		height: 80,
		width: '8.18%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#636f6f',
	},
	buttonText: {
		fontSize: 35,
		justifyContent: 'center',
	},
	displayStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 80,
		backgroundColor: '#F0EFEB',
		margin: 3,
		marginBottom: 0,
		width: '57.5%',
		borderRadius: 10,
	},
})

export default MenuTopRow
