import React from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from 'react-native'
import { Pressable } from 'react-native'
import { buttonStyles } from './styles'
import { getButtonColor } from './ButtonColor'

const SideMenuButton = ({
	text,
	category,
	setDisplayText,
	onDoublePress,
	onLongPress,
	setButtonLayout,
}) => {
	
   const handleMenuPress = () => {
      if (text === 'back') {
         setButtonLayout(prevState => {
            return prevState
         })
      }
   }
   
	return (
		<Pressable
			onPress={() => handleMenuPress(text)}
			style={({ pressed }) => [
				getButtonColor(category, pressed),
				buttonStyles.menuButton,
			]}
			delayLongPress={750}
		>
			<View justifyContent='center' alignItems='center'>
				{/* <FontAwesome5
					name='school'
					size={20}
					color='black'
				/> */}
				<Text style={buttonStyles.buttonText}>{text}</Text>
			</View>
		</Pressable>
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
		height: 75,
		backgroundColor: '#F0EFEB',
		margin: 2,
		marginBottom: 0,
		width: '58.5%',
		borderRadius: 10,
	},

})

export default SideMenuButton
