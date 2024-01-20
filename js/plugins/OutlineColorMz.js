/*:
 * @plugindesc サンプルコード
 * @target MZ
 */
(() => {
  "use strict";
  const _Window_Base_createContents = Window_Base.prototype.createContents;
  Window_Base.prototype.createContents = function () {
    _Window_Base_createContents.apply(this, arguments);
    this.contents.outlineWidth = 7;
  };

  ColorManager.outlineColor = function () {
    return "black";
  };
})();
