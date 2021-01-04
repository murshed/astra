import PropTypes from 'prop-types';
import {Dashicon} from '@wordpress/components';
import AstraColorPickerControl from '../common/astra-color-picker-control';
import {__} from '@wordpress/i18n';
import {useEffect, useState} from 'react';

const ResponsiveBackground = props => {


	// let value = props.control.setting.get();
	let defaultPropsValue = props.control.params.default;

	
	var dbvalue= props.control.setting.get();
	// console.log(dbvalue);
	var temp_dbval = Object.assign({},dbvalue);
	// console.log(dbvalue);

	var value
	if(temp_dbval.desktop['background-color'] && temp_dbval.desktop['background-color'].includes("palette")){
		var regex = /\d+/g;
		var string = temp_dbval.desktop['background-color'];
		var matches = string.match(regex);
		var updated_palette = props.customizer.control('astra-settings[global-color-palette]').setting.get()		
		temp_dbval.desktop['background-color'] = updated_palette[updated_palette.patterntype][matches]
		value = temp_dbval
	}else{		
		 value = props.control.setting.get();
	}
	const [state, setState] = useState({
			value: value,
		}
	);

	const updatepaletteuse = (value,index,defaultset) =>{		
		
		props.control.container[0].setAttribute('paleteused', value);
		props.control.container[0].setAttribute('paleteindex', index);	
		props.control.container[0].setAttribute('defaultset', defaultset);		


	}

	const updateValues = (obj) => {
		
		setState(prevState => ({
			...prevState,
			value: obj
		}));

		if(props.control.container[0].getAttribute('paleteindex')){	
			
			obj['desktop']['background-color']  = 'var(--global-palette'+props.control.container[0].getAttribute('paleteindex')+')';
			
		}

		props.control.setting.set(obj);
	};

	const updatePaletteState = (e) =>{
	
		var obj = {
			...state.value
		};
		if( e.detail.radiochange == "true" ){			
			var current_color;	


			switch(props.control.params.label) {
				case "Text Color":
					current_color = e.detail.palette[e.detail.palette.patterntype][0]
				break;
				case "Theme Color":
					current_color = e.detail.palette[e.detail.palette.patterntype][1]
				break;
				case "Link Color":
					current_color = e.detail.palette[e.detail.palette.patterntype][2]
				break;
				case "Link Hover Color":
					current_color = e.detail.palette[e.detail.palette.patterntype][3]
				break;
				case "Heading Color ( H1 - H6 )":
					current_color = e.detail.palette[e.detail.palette.patterntype][4]

				break;
				default:
					current_color = '';
			}			
			
		}else{

			if( ( props.control.params.label == "Text Color" || props.control.params.label == "Theme Color"|| props.control.params.label == "Link Color" || props.control.params.label == "Link Hover Color" || props.control.params.label == "Heading Color ( H1 - H6 )" || props.control.params.label == "Background" || props.control.params.label == "Background Color" || props.control.params.label == "Color & Image" || props.control.params.label == "Background Color & Image"  ) && (props.control.container[0].getAttribute('paleteindex') && props.control.container[0].getAttribute('paleteindex') == e.detail.index )  && (state.value['desktop']['background-color'] == e.detail.prevcolor)){
				
				var deviceObj = {
					...obj['desktop']
				};	
			
				var current_color = e.detail.newcolor;	
				if(deviceObj['background-color']){
					deviceObj['background-color'] = current_color;				
				}
				obj['desktop'] = deviceObj;

			}else{
				return
			}
			
		}
		updateValues(obj)
	}

	document.addEventListener( 'colorpaletteglobal', updatePaletteState, false );
	
	const updateBackgroundType = (device) => {
	
		let value = props.control.setting.get();
		let obj = {
			...value
		};
		if ( ! state.value[device]['background-type']) {
			let deviceObj = {
				...obj[device]
			};

			if (state.value[device]['background-color']) {
				deviceObj['background-type'] = 'color';
				obj[device] = deviceObj;
				updateValues(obj);

				if (state.value[device]['background-color'].includes('gradient')) {
					deviceObj['background-type'] = 'gradient';
					obj[device] = deviceObj;
					updateValues(obj);
				}
			}

			if (state.value[device]['background-image']) {
				deviceObj['background-type'] = 'image';
				obj[device] = deviceObj;
				updateValues(obj);
			}
		}
	};

	const renderReset = (key) => {
		let deleteBtnDisabled = true;
		let reserBtnDisabled = true;
		let devices = ['desktop', 'mobile', 'tablet'];

		for (let device of devices) {
			if (state.value[device]['background-color'] || state.value[device]['background-image'] || state.value[device]['background-media']) {
				deleteBtnDisabled = false;
			}

			if (state.value[device]['background-color'] !== defaultPropsValue[device]['background-image'] || state.value[device]['background-image'] !== defaultPropsValue[device]['background-color'] || state.value[device]['background-media'] !== defaultPropsValue[device]['background-media']) {
				reserBtnDisabled = false;
			}
		}

		return <span className="customize-control-title">
				<>
					<div className="ast-color-btn-reset-wrap">
						<button
							className="ast-reset-btn components-button components-circular-option-picker__clear is-secondary is-small"
							disabled={reserBtnDisabled} onClick={e => {
							e.preventDefault();
							let value = JSON.parse(JSON.stringify(defaultPropsValue));

							if (undefined !== value && '' !== value) {
								for (let device in value) {
									if (undefined === value[device]['background-color'] || '' === value[device]['background-color']) {
										value[device]['background-color'] = '';
										wp.customize.previewer.refresh();
									}

									if (undefined === value[device]['background-image'] || '' === value[device]['background-image']) {
										value[device]['background-image'] = '';
										wp.customize.previewer.refresh();
									}

									if (undefined === value[device]['background-media'] || '' === value[device]['background-media']) {
										value[device]['background-media'] = '';
										wp.customize.previewer.refresh();
									}
								}
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

	const onSelectImage = (media, key, backgroundType) => {
		let obj = {
			...state.value
		};
		let deviceObj = {
			...obj[key]
		};
		deviceObj['background-image'] = media.url;
		deviceObj['background-media'] = media.id;
		deviceObj['background-type'] = backgroundType;
		obj[key] = deviceObj;
		updateValues(obj);
	};

	const onChangeImageOptions = (mainKey, value, device, backgroundType) => {
		let obj = {
			...state.value
		};
		let deviceObj = {
			...obj[device]
		};
		deviceObj[mainKey] = value;
		deviceObj['background-type'] = backgroundType;
		obj[device] = deviceObj;
		updateValues(obj);
	};

	useEffect(() => {

		let devices = ['desktop', 'mobile', 'tablet'];
		for (let device of devices) {
			updateBackgroundType(device);
		}

	}, []);

	const renderSettings = (key) => {
		return <>
			<AstraColorPickerControl
				color={undefined !== state.value[key]['background-color'] && state.value[key]['background-color'] ? state.value[key]['background-color'] : ''}
				onChangeComplete={(color, backgroundType) => handleChangeComplete(color, key, backgroundType)}
				media={undefined !== state.value[key]['background-media'] && state.value[key]['background-media'] ? state.value[key]['background-media'] : ''}
				backgroundImage={undefined !== state.value[key]['background-image'] && state.value[key]['background-image'] ? state.value[key]['background-image'] : ''}
				backgroundAttachment={undefined !== state.value[key]['background-attachment'] && state.value[key]['background-attachment'] ? state.value[key]['background-attachment'] : ''}
				backgroundPosition={undefined !== state.value[key]['background-position'] && state.value[key]['background-position'] ? state.value[key]['background-position'] : ''}
				backgroundRepeat={undefined !== state.value[key]['background-repeat'] && state.value[key]['background-repeat'] ? state.value[key]['background-repeat'] : ''}
				backgroundSize={undefined !== state.value[key]['background-size'] && state.value[key]['background-size'] ? state.value[key]['background-size'] : ''}
				onSelectImage={(media, backgroundType) => onSelectImage(media, key, backgroundType)}
				onChangeImageOptions={(mainKey, value, backgroundType) => onChangeImageOptions(mainKey, value, key, backgroundType)}
				backgroundType={undefined !== state.value[key]['background-type'] && state.value[key]['background-type'] ? state.value[key]['background-type'] : 'color'}
				allowGradient={true} allowImage={true}
				defautColorPalette = {props.customizer.control('astra-settings[global-color-palette]').setting.get()}
				isPaletteUsed={key=='desktop' ? (value,index,defaultset) => updatepaletteuse(value,index,defaultset):''} 
				container ={props.control.container[0]}/>
		</>;
	};

	const handleChangeComplete = (color, key, backgroundType) => {
		let value = '';

		if (color) {
			if (typeof color === 'string' || color instanceof String) {
				value = color;
			} else if (undefined !== color.rgb && undefined !== color.rgb.a && 1 !== color.rgb.a) {
				value = 'rgba(' + color.rgb.r + ',' + color.rgb.g + ',' + color.rgb.b + ',' + color.rgb.a + ')';
			} else {
				value = color.hex;
			}
		}

		let obj = {
			...state.value
		};
		let deviceObj = {
			...obj[key]
		};

		

		deviceObj['background-color'] = value;
		deviceObj['background-type'] = backgroundType;
		obj[key] = deviceObj;
		updateValues(obj);
	};

	const {
		defaultValue,
		label,
		description
	} = props.control.params;
	let defaultVal = '#RRGGBB';
	let labelHtml = null;
	let descriptionHtml = null;
	let responsiveHtml = null;
	let inputHtml = null;

	if (defaultValue) {
		if ('#' !== defaultValue.substring(0, 1)) {
			defaultVal = '#' + defaultValue;
		} else {
			defaultVal = defaultValue;
		}

		defaultValueAttr = ' data-default-color=' + defaultVal; // Quotes added automatically.
	}

	if (label && '' !== label && undefined !== label) {
		labelHtml = <span className="customize-control-title">{label}</span>;
	} else {
		labelHtml = <span className="customize-control-title">{__('Background', 'astra')}</span>;
	}

	if (description) {
		descriptionHtml = <span className="description customize-control-description">{description}</span>;
	}

	responsiveHtml = <ul className="ast-responsive-btns">
		<li className="desktop active">
			<button type="button" className="preview-desktop" data-device="desktop">
				<i className="dashicons dashicons-desktop"></i>
			</button>
		</li>
		<li className="tablet">
			<button type="button" className="preview-tablet" data-device="tablet">
				<i className="dashicons dashicons-tablet"></i>
			</button>
		</li>
		<li className="mobile">
			<button type="button" className="preview-mobile" data-device="mobile">
				<i className="dashicons dashicons-smartphone"></i>
			</button>
		</li>
	</ul>;

	inputHtml = <div className="background-wrapper">
		<div className="background-container desktop active">
			{renderReset('desktop')}
			{renderSettings('desktop')}
		</div>
		<div className="background-container tablet">
			{renderReset('tablet')}
			{renderSettings('tablet')}
		</div>
		<div className="background-container mobile">
			{renderReset('mobile')}
			{renderSettings('mobile')}
		</div>
	</div>;

	return <>

		<label>
			{labelHtml}
			{descriptionHtml}
		</label>
		<div className="customize-control-content">
			{responsiveHtml}
			{inputHtml}
		</div>
	</>;
};

ResponsiveBackground.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( ResponsiveBackground );
