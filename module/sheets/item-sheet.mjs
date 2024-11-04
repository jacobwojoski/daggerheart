import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class DaggerheartItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['daggerheart', 'sheet', 'item'],
      width: 520,
      height: 480,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'description',
        },
      ],
    });
  }

  /** @override */
  get template() {
    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.hbs`.
    return `${path}/item-${this.item.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = this.document.toObject(false);

    // Enrich description info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    context.enrichedDescription = await TextEditor.enrichHTML(
      this.item.system.description,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        // Necessary in v11, can be removed in v12
        async: true,
        // Data to fill in for inline rolls
        rollData: this.item.getRollData(),
        // Relative UUID resolution
        relativeTo: this.item,
      }
    );

    // Add the item's data to context.data for easier access, as well as flags.
    context.system = itemData.system;
    context.flags = itemData.flags;

    // Adding a pointer to CONFIG.DAGGERHEART
    context.config = CONFIG.DAGGERHEART;

    // Prepare active effects for easier access
    context.effects = prepareActiveEffectCategories(this.item.effects);

    // Get different get data handlers bassed on the type of item we are;
    switch (this.item.type) {
      case "item":
        break;
      case "treasure":
        break;
      case "consumable":
        break;
      case "weapon":
        break;
      case "armor":
        break;
      case "card":
        break;
      default:
        break;
    }
    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  // Descrip: Activate any desired html elements that we care about user selection
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    // All sheets should be partially editable for first round
    //if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.
    // TODO: Check if there's a better way to specify specific groups so we dont need to handle inputs we dont want to
    html.on('click', "[data-action]", this._handleButtonClick.bind(this));
    html.on('input', "[data-action]", this._handleButtonClick.bind(this));
  }


  // Descrip: Callback for whenever an input field on an item sheet is selected. 
  //            Take whatever input group the input is from and handle it with a corresponding function
  // Input: event & this
  _handleButtonClick(event) {
    const element = $(event.currentTarget);
    const group = element.data().group;

    switch (group) {
      case "currency":
        _handleCurrencyInput(event);
        break;
    
      default:
        break;
    }
  }

  _handleCurrencyInput(event){
    const action = element.data().action;
    const value = element.data().value;
    if(action != 'input') return;

    switch (action) {
      case "total-coins":
        break;
      case "total-handfuls":
        break;
    
      default:
        break;
    }
  }

  /*------------------------------------------------------------------
  -------------------- Specific Get Data Funtions --------------------
  ------------------------------------------------------------------*/
  // Descrip: Fromat any details needed for generic Items
  // Inputs: None
  // Returns: Formated data object
  getGenericItemData() {
    return {};
  }

  // Descrip: Fromat any details needed for Treasure Items
  // Inputs: None
  // Returns: Formated data object
  getTreasureData() {
    return {};
  }


  // Descrip: Fromat any details needed for Consumable Items
  // Inputs: None
  // Returns: Formated data object
  getConsumableData() {
    return {};
  }

  // Descrip: Fromat any details needed for Weapon Items
  // Inputs: None
  // Returns: Formated data object
  getWeaponData() {
    return {};
  }

  // Descrip: Fromat any details needed for Armor Items
  // Inputs: None
  // Returns: Formated data object
  getArmorData() {

  }

  // Descrip: Fromat any details needed for Card Items
  //            This includes all card types 
  //            [ Ancestory, Upbrining, Class, Subclass | Foundation, Expertece, Mastery, | Domain ]
  // Inputs: None
  // Returns: Formated data object
  getCardData() {

  }
  getCardData() {

  }
  getDomainCardData() {

  }

}








