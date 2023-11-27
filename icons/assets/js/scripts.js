'use strict';

const twebFilterIcons = event => {
	const searchText = event.target.value.toLowerCase();
	const iconsNode  = event.target.parentNode.nextElementSibling;
	const areaNodes  = iconsNode.querySelectorAll('.tweb-icon-component__icons');

	areaNodes.forEach(areaNode => {
		let hasIcon = false;

		const buttons = areaNode.querySelectorAll('button[aria-label]');

		buttons.forEach(button => {
			const buttonLabel = button.getAttribute('aria-label').toLowerCase();

			if (searchText === '' || buttonLabel.includes(searchText)) {
				button.style.display = 'flex';
				hasIcon = true;
			} else {
				button.style.display = 'none';
			}
		});

		areaNode.style.display = (hasIcon) ? 'flex' : 'none';
		areaNode.previousSibling.style.display = (hasIcon) ? 'flex' : 'none';
	});
};

const twebCopyToClipboard = event => {
	if (event.target.dataset.tooltip) {
		navigator.clipboard.writeText(event.target.dataset.tooltip).then(() => {
			console.log('Copied:', event.target.dataset.tooltip);
		}).catch((err) => {
			console.error('Error:', err);
		});
	}
};


const twebSetTooltip = event => {
	const groupAriaLabelValue = event.target.closest('.tweb-icon-component__icons').previousSibling.getAttribute('aria-label');
	const buttonAriaLabelValue = event.target.getAttribute('aria-label');

	event.target.dataset.tooltip = `${groupAriaLabelValue}.${buttonAriaLabelValue}`.replace(/\s+/g, '-').toLowerCase();
};

window.addEventListener('DOMContentLoaded', () => {
	const searchNode  = document.querySelector('.tweb-icon-component__search input');
	const buttonNodes = document.querySelectorAll('.components-button');

	searchNode.addEventListener('input', twebFilterIcons);

	buttonNodes.forEach(buttonNode => {
		buttonNode.addEventListener('focus', twebSetTooltip);
		buttonNode.addEventListener('mouseover', twebSetTooltip);
		buttonNode.addEventListener('click', twebCopyToClipboard);
	});
});