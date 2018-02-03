import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

export default class TextInput extends PureComponent {
	render() {
		const {
			className,
			inputClassName,
			labelClassName,
			labelText,
			type,
			value,
			onChange,
			subtextClass,
			errorSubtextClass,
			hintSubtextClass,
			invalidInputClassName,
			onKeyPress,
			errorText,
			hintText,
		} = this.props;
		const isInvalid = errorText != null;

		const subtextClasses = cn(
			subtextClass,
			{
				[errorSubtextClass]: isInvalid,
				[hintSubtextClass]: !isInvalid,
			}
		);

		const inputClassNames = cn(
			inputClassName,
			{
				[invalidInputClassName]: isInvalid
			}
		)

		const subtext = isInvalid && errorText != null ? errorText : hintText;

		return (
			<div className={className}>
				<label className={labelClassName}>{labelText}</label>
				<input
					className={inputClassNames}
					value={value}
					onChange={onChange}
					onKeyPress={onKeyPress}
					type={type}
				/>
				{subtext != null && (
					<small className={subtextClasses}>
						{subtext}
					</small>
				)}
			</div>
		)
	}
}

TextInput.propTypes = {
	/* Class for the top-level node */
	className: PropTypes.string,
	/* Class for the input */
	inputClassName: PropTypes.string,
	/* Class for the label */
	labelClassName: PropTypes.string,
	/* Label contents for the input */
	labelText: PropTypes.string,
	/* Value of the input */
	value: PropTypes.string,
	/* Type of the input */
	type: PropTypes.string,
	/* Callback for when the text input changes */
	onChange: PropTypes.func,
	/* Text to show while the input is in an error state */
	errorText: PropTypes.string,
	/* Text to show as a hint for the input */
	hintText: PropTypes.string,
	/* Class to apply to the text underneath inputs regardless of whether or not the input is invalid */
	subtextClass: PropTypes.string,
	/* Class to apply to the text underneath inputs if the input is invalid */
	errorSubtextClass: PropTypes.string,
	/* Class to apply to the text underneath inputs if the input is valid */
	hintSubtextClass: PropTypes.string,
	/* Callback function to be called on key press */
	onKeyPress: PropTypes.func,
};

TextInput.defaultProps = {
	className: 'form-group',
	labelClassName: '',
	inputClassName: 'form-control',
	invalidInputClassName: 'is-invalid',
	errorSubtextClass: 'invalid-feedback',
	hintSubtextClass: 'form-text text-muted',
}