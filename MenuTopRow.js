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
		</View>
	)
}

const styles = StyleSheet.create({
	xStack: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 1,
		backgroundColor: '#2e3a43',
	},
	menuButton: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 0.5,
		padding: 0,
		height: 75,
		width: '8.17%',
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
		height: 75,
		backgroundColor: '#F0EFEB',
		margin: 2,
		marginBottom: 0,
		width: '58.5%',
		borderRadius: 10,
	},
})

export default MenuTopRow
