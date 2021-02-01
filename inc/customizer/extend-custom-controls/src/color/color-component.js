import PropTypes from 'prop-types';
import {Dashicon,Popover,Button} from '@wordpress/components';
import AstraColorPickerControl from '../common/astra-color-picker-control';
import {useState} from 'react';

const ColorComponent = props => {
	let value
	if(props.control.setting.get() && props.control.setting.get().includes("palette")){
		var regex = /\d+/g;
		var string = props.control.setting.get();
		var matches = string.match(regex);
		var updated_palette = props.customizer.control('astra-settings[global-color-palette]').setting.get()		
		value = updated_palette[updated_palette.patterntype][matches][0]
	}else{
		 value = props.control.setting.get();
	}

	let defaultValue = props.control.params.default;
	
	const [state, setState] = useState({
		value: value,
		isVisible:false,	
	});
	
	const updateValues = (value) => {
		setState(prevState => ({
			...prevState,
			value: value
		}));
		
		if(props.control.container[0].getAttribute('paletteindex')){			
			props.control.setting.set('var(--global-palette'+props.control.container[0].getAttribute('paletteindex')+')');
		}else{
			props.control.setting.set(value);
		}
		
	};

	const updatepaletteuse = (value,index,defaultset) =>{		
		props.control.container[0].setAttribute('paletteused', value);
		props.control.container[0].setAttribute('paletteindex', index);	
		props.control.container[0].setAttribute('defaultset', defaultset);		
	}

	const updatePaletteState = (e) =>{
	
		if( e.detail.radiochange == "true" ){			
			var current_color;		
			var current_index =  props.control.container[0].getAttribute('paletteindex')
			switch(props.control.params.label) {
				case "Text Color":
					current_color = e.detail.palette[e.detail.palette.patterntype][current_index][0]
				break;
				case "Theme Color":
					current_color = e.detail.palette[e.detail.palette.patterntype][current_index][0]
				break;
				case "Link Color":
					current_color = e.detail.palette[e.detail.palette.patterntype][current_index][0]
				break;
				case "Link Hover Color":
					current_color = e.detail.palette[e.detail.palette.patterntype][current_index][0]
				break;
				case "Heading Color ( H1 - H6 )":
					current_color = e.detail.palette[e.detail.palette.patterntype][current_index][0]

				break;
				default:
					current_color = '';
			}			
			
		}else{
			
			if( ( props.control.params.label == ( "Text Color" ) || props.control.params.label == ( "Theme Color" ) ||
			props.control.params.label == ( "Link Color" ) || props.control.params.label == ( "Link Hover Color" ) || props.control.params.label == ( "Heading Color ( H1 - H6 )" ) || props.control.params.label == ( "Border Color" ) || props.control.params.label == ( "Toggle Button Color") || props.control.params.label == ( "Divider Color" ) || props.control.params.label == ( "Bottom Border Color" ) || props.control.params.label == ( "Top Border Color" ) || props.control.params.label == ( "Background Color" ) || props.control.params.label == ( "Color" ) || props.control.params.label == ( "Icon Color" ) || props.control.params.label == ( "Close Icon Color" ) || props.control.params.label == ( "Hover Color" ) ) && (props.control.container[0].getAttribute('paletteindex') && props.control.container[0].getAttribute('paletteindex') == e.detail.index )  ){
				var current_color = e.detail.newcolor;	
			}else{
				return
			}
			
		}
		
		updateValues(current_color)
	}
	document.addEventListener( 'colorpaletteglobal', updatePaletteState, false );

	const toggleClose = () => {
		setState(prevState => ({
			...prevState,
			isVisible: false
		}));
	};
	var globalPalette = props.customizer.control('astra-settings[global-color-palette]').setting.get()

	const handleGlobalColorPopupBtn = (value,index,defaultset,color) => {
	
		updatepaletteuse(value,index,defaultset);
		updateValues(color)
	}

	const renderOperationButtons = () => {
		return <span className="customize-control-title">
				<>
					<div className="ast-global-color-btn-wrap">
						<button	className="ast-global-color-btn components-button is-secondary" 
						onClick={e => {
							e.preventDefault();
							setState(prevState => ({
								...prevState,
								isVisible: !state.isVisible
							}));
						}}>
							<Dashicon icon='admin-site-alt3' style={{
								width: 14,
								height: 14,
								fontSize: 14
							}}/>
						</button>
						{ state.isVisible && (
                			<Popover position={"bottom center"} onClose={ toggleClose } className="ast-global-palette-popup">
								<label className="ast-global-color-palette-manage-label">Global Colors</label>
								<Button
									className='ast-global-color-palette-manage'
									onClick={ () =>props.customizer.control('astra-settings[global-color-palette]').focus() }
									tabIndex={ 0 }
								>
									<Dashicon icon='admin-generic' style={{
										width: 12,
										height: 12,
										fontSize: 12
									}}/>
								</Button>
								<hr/>
								{ Object.keys( globalPalette.pattern1 ).map( ( item, index ) => { 
														
									return ( 
										<Button
											className='ast-global-color-individual-btn'
											onClick={ () =>handleGlobalColorPopupBtn( true,index,'no',globalPalette.pattern1[item][0] ) }
											tabIndex={ 0 }
											key={index}
											title={ globalPalette.pattern1[item][1]}
										>
											<div className={ state.value == globalPalette.pattern1[item][0] ? 'ast-global-color-sticker selected' : 'ast-global-color-sticker' }
												style={{ background:globalPalette.pattern1[item][0] }} 
											/>
											<div className="ast-global-color-title">{ globalPalette.pattern1[item][1]}</div>
											<div className="ast-global-color-hexcode">{ globalPalette.pattern1[item][0]}</div>
										</Button>
									)
								} )}
							</Popover>
						)}
					</div>
					<div className="ast-color-btn-reset-wrap">
						<button
							className="ast-reset-btn components-button components-circular-option-picker__clear is-secondary is-small"
							disabled={JSON.stringify(state.value) === JSON.stringify(defaultValue)} onClick={e => {
							e.preventDefault();
							let value = JSON.parse(JSON.stringify(defaultValue));

							if (undefined === value || '' === value) {
								value = '';
								wp.customize.previewer.refresh();
							}

							updateValues(value);
						}}>
						<Dashicon icon='image-rotate' style={{
							width: 12,
							height: 12,
							fontSize: 12
						}}/>
						</button>
					</div>
				</>
			</span>;
	};

	const handleChangeComplete = ( color ) => {
		let value;

		if (typeof color === 'string' || color instanceof String) {
			value = color;
		} else if (undefined !== color.rgb && undefined !== color.rgb.a && 1 !== color.rgb.a) {
			value = 'rgba(' + color.rgb.r + ',' + color.rgb.g + ',' + color.rgb.b + ',' + color.rgb.a + ')';
		} else {
			value = color.hex;
		}

		updateValues(value);
	};

	let labelHtml = null;
	const {
		label
	} = props.control.params;

	if (label) {
		labelHtml = <span className="customize-control-title">{label}</span>;
	}


	


	return <>
		<label>
			{labelHtml}
		</label>
		<div className="ast-color-picker-alpha color-picker-hex">
			{renderOperationButtons()}
			<AstraColorPickerControl color={undefined !== state.value && state.value ? state.value : ''}
									 onChangeComplete={(color, backgroundType) => handleChangeComplete(color)}
									 backgroundType={'color'}
									 allowGradient={false}
									 allowImage={false}
									 defautColorPalette = {props.customizer.control('astra-settings[global-color-palette]').setting.get()}
									 isPaletteUsed={(value,index,defaultset) => updatepaletteuse(value,index,defaultset)}
									 container ={props.control.container[0]}
									 disablePalette={true}
									 />
									 

		</div>
	</>;

};

ColorComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo ( ColorComponent );