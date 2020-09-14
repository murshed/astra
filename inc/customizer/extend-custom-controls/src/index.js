import { BaseControl } from './base/control';
import { headingControl } from './heading/control';
import { hiddenControl } from './hidden/control';
import { descriptionControl } from './description/control';
import { linkControl } from './link/control.js';
import { dividerControl } from './divider/control';
import { settingsGroupControl } from './settings-group/control';
import { colorControl } from './color/control.js';
import { responsiveColorControl } from './responsive-color/control'
import { responsiveBackgroundControl } from './responsive-background/control';
import { backgroundControl } from './background/control';
import { sortableControl } from './sortable/control';
import { borderControl } from './border/control';
import { customizerLinkControl } from './customizer-link/control';
import { responsiveControl } from './responsive/control';
import { responsiveSliderControl } from './responsive-slider/control';
import { sliderControl } from './slider/control';
import { radioImageControl } from './radio-image/control';
import { responsiveSpacingControl }  from './responsive-spacing/control';
import { selectControl } from './select/control';
import { astFontFamilyControl } from './ast-font-family/control';
import { astFontWeightControl } from './ast-font-weight/control';
import { responsiveSelectControl } from './responsive-select/control';

import { BuilderHeaderControl } from './builder-layout/builder-header-control.js'
import { BuilderControl } from './builder-layout/control.js';
import { SocialControl } from './social-icons/control.js';
import { EditorControl } from './html-editor/control.js';
import { IconSetControl } from './icon-set/control.js';
import { DraggableControl } from './draggable/control.js';
import { SwitchControl } from './switch/control.js';
import { HeaderTypeButtonControl } from './header-type-button/control';
import { RowLayoutControl } from './row-layout/control.js';

wp.customize.controlConstructor['ast-heading'] = headingControl;
wp.customize.controlConstructor['ast-hidden'] = hiddenControl;
wp.customize.controlConstructor['ast-description'] = descriptionControl;
wp.customize.controlConstructor['ast-link'] = linkControl;
wp.customize.controlConstructor['ast-divider'] = dividerControl;
wp.customize.controlConstructor['ast-settings-group'] = settingsGroupControl;
wp.customize.controlConstructor['ast-color'] = colorControl;
wp.customize.controlConstructor['ast-responsive-color'] = responsiveColorControl;
wp.customize.controlConstructor['ast-responsive-background'] = responsiveBackgroundControl;
wp.customize.controlConstructor['ast-background'] = backgroundControl;
wp.customize.controlConstructor['ast-sortable'] = sortableControl;
wp.customize.controlConstructor['ast-border'] = borderControl;
wp.customize.controlConstructor['ast-customizer-link'] = customizerLinkControl;
wp.customize.controlConstructor['ast-responsive'] = responsiveControl;
wp.customize.controlConstructor['ast-responsive-slider'] = responsiveSliderControl;
wp.customize.controlConstructor['ast-slider'] = sliderControl;
wp.customize.controlConstructor['ast-radio-image'] = radioImageControl;
wp.customize.controlConstructor['ast-responsive-spacing'] = responsiveSpacingControl;
wp.customize.controlConstructor['ast-select'] = selectControl;
wp.customize.controlConstructor['ast-font-family'] = astFontFamilyControl;
wp.customize.controlConstructor['ast-font-weight'] = astFontWeightControl;
wp.customize.controlConstructor['ast-responsive-select'] = responsiveSelectControl;

wp.customize.controlConstructor['ast-builder-header-control'] = BuilderHeaderControl;
wp.customize.controlConstructor['ast-builder'] = BuilderControl;
wp.customize.controlConstructor['ast-social-icons'] = SocialControl;
wp.customize.controlConstructor['ast-html-editor'] = EditorControl;
wp.customize.controlConstructor['ast-icon-set'] = IconSetControl;
wp.customize.controlConstructor['ast-draggable-items'] = DraggableControl;
wp.customize.controlConstructor['ast-switch-toggle'] = SwitchControl;
wp.customize.controlConstructor['ast-header-type-button'] = HeaderTypeButtonControl;
wp.customize.controlConstructor['ast-row-layout'] = RowLayoutControl;

import { Base } from './customizer';