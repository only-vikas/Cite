'use strict';

/*!
 * VisualEditor UserInterface MediaWiki ReferencesListCommand class.
 *
 * @copyright 2011-2018 VisualEditor Team's Cite sub-team and others; see AUTHORS.txt
 * @license MIT
 */

const MWReferencesListNode = require('./ve.dm.MWReferencesListNode.js');

/**
 * References list command.
 *
 * If a references list node is selected, opens the dialog to edit it.
 * Otherwise inserts the references list for the default group.
 *
 * @constructor
 * @extends ve.ui.Command
 */
ve.ui.MWReferencesListCommand = function VeUiMWReferencesListCommand() {
	// Parent constructor
	ve.ui.MWReferencesListCommand.super.call(
		this, 'referencesList', null, null,
		{ supportedSelections: ['linear'] }
	);
};

/* Inheritance */

OO.inheritClass(ve.ui.MWReferencesListCommand, ve.ui.Command);

/* Methods */

/**
 * @override
 */
ve.ui.MWReferencesListCommand.prototype.execute = function (surface) {
	const fragment = surface.getModel().getFragment();
	const selectedNode = fragment.getSelectedNode();
	const isReflistNodeSelected = selectedNode &&
		selectedNode instanceof MWReferencesListNode;

	if (isReflistNodeSelected) {
		return surface.execute('window', 'open', 'referencesList');

	} else {
		// We already have surface and fragment from earlier in the method:
		const documentModel = surface.getModel().getDocument();

		// Choose the most appropriate localized name for "References".
		// Alternatively, use mw.msg( 'cite-tracking-category-cite-error' ) if strictly tied to it
		const headingText = mw.msg('cite-wikieditor-help-page-references');

		// Step 1: Traverse the document to check if a Level 2 Heading ("References") already exists
		let hasReferencesHeading = false;
		documentModel.getDocumentNode().traverse(function (node) {
			if (node.type === 'mwHeading' && node.getAttribute('level') === 2) {
				// Get the text inside this Heading node
				const text = documentModel.data.getText(true, node.getRange()).trim();
				if (text === headingText || text === 'References') {
					hasReferencesHeading = true;
					return false; // Break the traversal early once found
				}
			}
		});

		// Step 2: Build our insertion array for the Transaction
		const contentToInsert = [];

		// If no such heading exists anywhere in the document, prepend the mwHeading structure
		if (!hasReferencesHeading) {
			contentToInsert.push({ type: 'mwHeading', attributes: { level: 2 } });

			// Push actual heading characters (VisualEditor requires strings split to char array inside insert content blocks)
			contentToInsert.push(...headingText.split(''));

			contentToInsert.push({ type: '/mwHeading' });
		}

		// Always append the mwReferencesList node
		contentToInsert.push(
			{
				type: 'mwReferencesList',
				attributes: {
					listGroup: 'mwReference/',
					refGroup: '',
					isResponsive: mw.config.get('wgCiteResponsiveReferences')
				}
			},
			{ type: '/mwReferencesList' }
		);

		// Step 3: Insert using surface Fragment (which proxies to ve.dm.TransactionBuilder natively)
		fragment.collapseToEnd().insertContent(contentToInsert);

		/*
		 * OPTIONAL STRICT ALTERNATIVE:
		 * If constrained to using ve.dm.TransactionBuilder explicitly instead of fragment.insertContent(): 
		 *
		 * const tx = ve.dm.TransactionBuilder.static.newFromInsertion(
		 *     documentModel,
		 *     fragment.getSelection().getRange().end, // Insert at the current collapsed cursor
		 *     contentToInsert
		 * );
		 * surface.getModel().change( tx );
		 */

		return true;
	}


};

module.exports = ve.ui.MWReferencesListCommand;
