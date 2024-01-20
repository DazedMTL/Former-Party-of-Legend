//=============================================================================
// RPG Maker MZ - Kpp_PictureBattleCommand.js
//=============================================================================
// Copyright (c) 2020 カッピ
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
// ウェブサイト
// http://birdwind.webcrow.jp/
//
// Twitter
// https://twitter.com/kappi_bw

/*:
 * @target MZ
 * @plugindesc バトルコマンドを画像化 ver 1.03
 * @author カッピ
 * @url http://birdwind.webcrow.jp/plugin/
 *
 * @help Kpp_PictureBattleCommand.js
 * 
 * バトル画面のコマンドウィンドウのデザインを変更します。
 * ウィンドウの項目に、背景画像が追加されます。
 * 画像はプラグインパラメータで差し替えできます。
 *
 * 背景画像は、次のフォルダに入れてください。
 * img/pictures/
 *
 * ＜スキルリストの背景画像＞
 * 戦闘中のスキルリストに表示される背景画像は、
 * プラグインパラメータで指定する以外に、
 * データベースのスキルでも変更できます。
 * データベースで指定しなかったスキルのみ、
 * プラグインパラメータで指定した画像を表示します。
 *
 * データベースで指定するには、
 * スキルのメモ欄に以下のようなテキストを書きます。
 * <commandPicture:画像ファイル名>
 *
 * 例) <commandPicture:BattleCommand_Heal>
 *
 * ※拡張子(.png)は書きません
 * ※画像は img/pictures/ フォルダに入れておいてください
 *
 * @param modeHorz
 * @text コマンド横表示モード
 * @desc 縦表示のバトルコマンドを横表示に切り替える
 * @type select
 * @option OFF
 * @option ON
 * @default OFF
 *
 * @param pictureWidth
 * @text 画像ファイルの幅
 * @desc コマンドに表示する画像ファイルの共通の横幅
 * @type number
 * @default 160
 * @min 60
 * @max 384
 *
 * @param pictureHeight
 * @text 画像ファイルの高さ
 * @desc コマンドに表示する画像ファイルの共通の縦幅
 * @type number
 * @default 80
 * @min 40
 * @max 256
 *
 * @param selectScale
 * @text 選択中の拡大率
 * @desc コマンドが選択されている時の画像の拡大率(％)
 * @type number
 * @default 100
 * @min 0
 * @max 100
 *
 * @param deselectScale
 * @text 非選択時の拡大率
 * @desc コマンドが選択されていない時の画像の拡大率(％)
 * @type number
 * @default 80
 * @min 0
 * @max 100
 
 * @param fileFight
 * @text 戦うコマンドの画像
 * @desc 「戦う」コマンドに表示する画像ファイル
 * @default BattleCommand_Fight
 * @type file
 * @dir img/pictures/
 *
 * @param fileEscape
 * @text 逃げるコマンドの画像
 * @desc 「逃げる」コマンドに表示する画像ファイル
 * @default BattleCommand_Escape
 * @type file
 * @dir img/pictures/
 *
 * @param fileAttack
 * @text 攻撃コマンドの画像
 * @desc 「攻撃」コマンドに表示する画像ファイル
 * @default BattleCommand_Fight
 * @type file
 * @dir img/pictures/
 *
 * @param fileSkill
 * @text スキルコマンドの画像
 * @desc 「スキル(必殺技など)」コマンドに表示する画像ファイル
 * @default BattleCommand_Skill
 * @type file
 * @dir img/pictures/
 *
 * @param fileGuard
 * @text 防御コマンドの画像
 * @desc 「防御」コマンドに表示する画像ファイル
 * @default BattleCommand_Guard
 * @type file
 * @dir img/pictures/
 *
 * @param fileItem
 * @text アイテムコマンドの画像
 * @desc 「アイテム」コマンドに表示する画像ファイル
 * @default BattleCommand_Item
 * @type file
 * @dir img/pictures/
 *
 * @param fileItemList
 * @text アイテムリストの項目の画像
 * @desc 戦闘中のアイテムリストに表示する画像ファイル
 * @default BattleCommand_Item
 * @type file
 * @dir img/pictures/
 *
 * @param fileSkillList
 * @text スキルリストの項目の画像
 * @desc 戦闘中のスキルリストに表示する画像ファイル / データベースで指定されていれば、そちらを優先
 * @default BattleCommand_Skill
 * @type file
 * @dir img/pictures/
 *
 * @param fileEnemy
 * @text エネミー選択ウィンドウの項目の画像
 * @desc 戦闘中のエネミー選択ウィンドウに表示する画像ファイル
 * @default BattleCommand_Enemy
 * @type file
 * @dir img/pictures/
 *
 * @noteParam commandPicture
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData skills
 */

(() => {
  "use strict";

  const pluginName = "Kpp_PictureBattleCommand";
  const parameters = PluginManager.parameters(pluginName);

  const paramModeHorz = parameters["modeHorz"] || "OFF";
  const paramPictureWidth = Number(parameters["pictureWidth"] || 160);
  const paramPictureHeight = Number(parameters["pictureHeight"] || 80);
  const paramSelectScale = Number(parameters["selectScale"] || 100);
  const paramDeselectScale = Number(parameters["deselectScale"] || 80);
  const paramFileFight = parameters["fileFight"] || "";
  const paramFileEscape = parameters["fileEscape"] || "";
  const paramFileAttack = parameters["fileAttack"] || "";
  const paramFileSkill = parameters["fileSkill"] || "";
  const paramFileGuard = parameters["fileGuard"] || "";
  const paramFileItem = parameters["fileItem"] || "";
  const paramFileItemList = parameters["fileItemList"] || "";
  const paramFileSkillList = parameters["fileSkillList"] || "";
  const paramFileEnemy = parameters["fileEnemy"] || "";

  // --------------------------------------------------------
  // Window_PartyCommand
  // --------------------------------------------------------

  const _Window_PartyCommand_initialize =
    Window_PartyCommand.prototype.initialize;
  Window_PartyCommand.prototype.initialize = function (rect) {
    // コマンド用スプライトの配列
    this._spriteCommand = [];

    _Window_PartyCommand_initialize.apply(this, arguments);
  };

  Window_PartyCommand.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    const align = this.itemTextAlign();
    this.resetTextColor();

    // コマンド画像名を取得
    const pictureName = this.pictureName(index);
    // コマンド画像が指定されていれば
    if (pictureName !== "") {
      // コマンド用スプライトが未生成なら、生成
      if (!this._spriteCommand[index]) {
        this._spriteCommand[index] = new Sprite();
        this.addChild(this._spriteCommand[index]);
        this._spriteCommand[index].x =
          rect.x + rect.width / 2 + this.itemPadding();
        this._spriteCommand[index].y =
          rect.y + rect.height / 2 + this.itemPadding();
        this._spriteCommand[index].anchor.x = 0.5;
        this._spriteCommand[index].anchor.y = 0.5;
        this._spriteCommand[index].scale.x = paramDeselectScale / 100;
        this._spriteCommand[index].scale.y = paramDeselectScale / 100;
      }
      this._spriteCommand[index].bitmap = new Bitmap(
        paramPictureWidth,
        paramPictureHeight
      );
      // コマンド画像を読み込み
      const bitmap = ImageManager.loadPicture(pictureName);
      // コマンド画像の読み込みが完了したら
      bitmap.addLoadListener(
        function () {
          this.changePaintOpacity(this.isCommandEnabled(index));

          this._spriteCommand[index].bitmap.fontSize =
            $gameSystem.mainFontSize();
          this._spriteCommand[index].bitmap.fontFace =
            $gameSystem.mainFontFace();
          // コマンド用スプライトのビットマップにコマンド画像を描画
          this._spriteCommand[index].bitmap.blt(
            bitmap,
            0,
            0,
            paramPictureWidth,
            paramPictureHeight,
            0,
            0
          );
          // コマンド用スプライトのビットマップにテキストを描画
          this._spriteCommand[index].bitmap.drawText(
            this.commandName(index),
            0,
            0,
            paramPictureWidth - 8,
            paramPictureHeight,
            "right"
          );
          // コマンドの有効無効に合わせて、コマンド用スプライトの不透明度変更
          this._spriteCommand[index].opacity = this.contents.paintOpacity;

          this._spriteCommand[index].visible = true;
          if (this._index === index) {
            this._spriteCommand[index].scale.x = paramSelectScale / 100;
            this._spriteCommand[index].scale.y = paramSelectScale / 100;
          }
        }.bind(this)
      );
    } else {
      this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    }
  };
  const _Window_PartyCommand_drawItem = Window_PartyCommand.prototype.drawItem;

  Window_PartyCommand.prototype.select = function (index) {
    if (index >= 0 && this._index != index && this._spriteCommand) {
      // 全項目のスプライトを、非選択時の拡大率に
      for (let i = 0; i < this.maxItems(); i++) {
        if (this._spriteCommand[i]) {
          this._spriteCommand[i].scale.x = paramDeselectScale / 100;
          this._spriteCommand[i].scale.y = paramDeselectScale / 100;
        }
      }
      // 新たに選択された項目のスプライトを、選択中の拡大率に
      if (this._spriteCommand[index]) {
        this._spriteCommand[index].scale.x = paramSelectScale / 100;
        this._spriteCommand[index].scale.y = paramSelectScale / 100;
      }
    }

    this._index = index;
    //this.refreshCursor();
    this.callUpdateHelp();
  };
  const _Window_PartyCommand_select = Window_PartyCommand.prototype.select;

  Window_PartyCommand.prototype.itemHeight = function () {
    return paramPictureHeight + 8;
  };

  Window_PartyCommand.prototype.lineHeight = function () {
    return paramPictureHeight - 16;
  };

  Window_PartyCommand.prototype.pictureName = function (index) {
    if (index == 0) return paramFileFight;
    if (index == 1) return paramFileEscape;
    return "";
  };

  Window_PartyCommand.prototype.maxCols = function () {
    return paramModeHorz == "ON" ? 2 : 1;
  };

  Window_PartyCommand.prototype.translucentOpacity = function () {
    return 100;
  };

  Scene_Battle.prototype.partyCommandWindowRect = function () {
    if (paramModeHorz == "ON") {
      const ww = 192 + 160;
      const wh = this.calcWindowHeight(2, false) + 16;
      const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
      const wy = Graphics.boxHeight - wh - this.calcWindowHeight(5, false);
      return new Rectangle(wx, wy, ww, wh);
    }
    const ww = 192;
    const wh = this.windowAreaHeight();
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
  };

  // --------------------------------------------------------
  // Window_ActorCommand
  // --------------------------------------------------------

  const _Window_ActorCommand_initialize =
    Window_ActorCommand.prototype.initialize;
  Window_ActorCommand.prototype.initialize = function (rect) {
    // コマンド用スプライトの配列
    this._spriteCommand = [];

    _Window_ActorCommand_initialize.apply(this, arguments);
  };

  Scene_Battle.prototype.actorCommandWindowRect = function () {
    if (paramModeHorz == "ON") {
      return new Rectangle(0, 0, 0, 0);
    }
    const ww = 192;
    //const wh = this.windowAreaHeight();
    const wh = this.calcWindowHeight(8, true);
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
  };

  Window_ActorCommand.prototype.refresh = function () {
    this.clearCommandList();
    this.makeCommandList();

    if (this._spriteCommand) {
      for (let i = 0; i < this._spriteCommand.length; i++) {
        this._spriteCommand[i].visible = false;
        this._spriteCommand[i].scale.x = paramDeselectScale / 100;
        this._spriteCommand[i].scale.y = paramDeselectScale / 100;
      }
    }

    if (paramModeHorz == "ON") {
      this.width = 192 + Math.min(4, this.maxCols() - 1) * paramPictureWidth;
      this.height =
        this.fittingHeight(2) +
        16 +
        (this.maxItems() >= 5 ? this.fittingHeight(2) : 0);
      this.x = Graphics.boxWidth - this.width;
      this.y = Graphics.boxHeight - this.height - this.fittingHeight(5);
    } else {
      this.height =
        this.fittingHeight(8, true) +
        (this.maxItems() >= 5 ? this.fittingHeight(2) : 0);
      this.y = Graphics.boxHeight - this.height;
    }

    Window_Selectable.prototype.refresh.call(this);
  };

  Window_ActorCommand.prototype.fittingHeight = function (
    numLines,
    selectable = false
  ) {
    if (selectable) {
      return Window_Selectable.prototype.fittingHeight(numLines);
    } else {
      return Window_Base.prototype.fittingHeight(numLines);
    }
  };

  Window_ActorCommand.prototype.drawItem = _Window_PartyCommand_drawItem;

  Window_ActorCommand.prototype.select = _Window_PartyCommand_select;

  Window_ActorCommand.prototype.itemHeight = function () {
    return paramPictureHeight + 8;
  };

  Window_ActorCommand.prototype.lineHeight = function () {
    return paramPictureHeight - 16;
  };

  Window_ActorCommand.prototype.maxCols = function () {
    return paramModeHorz == "ON" ? 4 : 1;
  };

  Window_ActorCommand.prototype.addCommand = function (
    name,
    symbol,
    enabled = true,
    ext = null,
    file = null
  ) {
    this._list.push({
      name: name,
      symbol: symbol,
      enabled: enabled,
      ext: ext,
      file: file,
    });
  };

  Window_ActorCommand.prototype.addAttackCommand = function () {
    this.addCommand(
      TextManager.attack,
      "attack",
      this._actor.canAttack(),
      null,
      paramFileAttack
    );
  };

  Window_ActorCommand.prototype.addSkillCommands = function () {
    const skillTypes = this._actor.skillTypes();
    for (const stypeId of skillTypes) {
      const name = $dataSystem.skillTypes[stypeId];
      this.addCommand(name, "skill", true, stypeId, paramFileSkill);
    }
  };

  Window_ActorCommand.prototype.addGuardCommand = function () {
    this.addCommand(
      TextManager.guard,
      "guard",
      this._actor.canGuard(),
      null,
      paramFileGuard
    );
  };

  Window_ActorCommand.prototype.addItemCommand = function () {
    this.addCommand(TextManager.item, "item", true, null, paramFileItem);
  };

  Window_ActorCommand.prototype.pictureName = function (index) {
    return this._list[index].file;
  };

  Window_ActorCommand.prototype.translucentOpacity = function () {
    return 100;
  };

  // --------------------------------------------------------
  // Window_BattleItem
  // --------------------------------------------------------

  Window_BattleItem.prototype.drawItem = function (index) {
    const item = this.itemAt(index);
    if (item) {
      const numberWidth = this.numberWidth();
      const rect = this.itemLineRect(index);

      // コマンド画像を読み込み
      const bitmap = ImageManager.loadPicture(paramFileItemList);
      // コマンド画像の読み込みが完了したら
      bitmap.addLoadListener(
        function () {
          this.changePaintOpacity(this.isEnabled(item));
          // ウィンドウにコマンド画像を描画
          this.contents.blt(
            bitmap,
            0,
            0,
            paramPictureWidth,
            paramPictureHeight,
            rect.x + rect.width / 2 - bitmap.width / 2,
            rect.y + rect.height / 2 - bitmap.height / 2
          );
          // ウィンドウにテキストを描画
          this.drawItemName(
            item,
            rect.x + rect.width / 2 - paramPictureWidth / 2 + 8,
            rect.y - this.lineHeight() / 4,
            paramPictureWidth - 16
          );
          this.drawItemNumber(
            item,
            rect.x + rect.width / 2 - paramPictureWidth / 2 - 8,
            rect.y + this.lineHeight() / 4,
            paramPictureWidth
          );
          this.changePaintOpacity(1);
        }.bind(this)
      );
    }
  };

  Window_BattleItem.prototype.itemHeight = function () {
    return paramPictureHeight + 8;
  };

  Window_BattleItem.prototype.lineHeight = function () {
    return paramPictureHeight - 16;
  };

  Window_BattleItem.prototype.maxCols = function () {
    return 4;
  };

  Window_BattleItem.prototype.translucentOpacity = function () {
    return 100;
  };

  // --------------------------------------------------------
  // Window_BattleSkill
  // --------------------------------------------------------

  Window_BattleSkill.prototype.drawItem = function (index) {
    const skill = this.itemAt(index);
    if (skill) {
      const costWidth = this.costWidth();
      const rect = this.itemLineRect(index);

      // コマンド画像を読み込み
      const fileName = skill.meta.commandPicture
        ? skill.meta.commandPicture
        : paramFileSkillList;
      const bitmap = ImageManager.loadPicture(fileName);
      // コマンド画像の読み込みが完了したら
      bitmap.addLoadListener(
        function () {
          this.changePaintOpacity(this.isEnabled(skill));
          // ウィンドウにコマンド画像を描画
          this.contents.blt(
            bitmap,
            0,
            0,
            paramPictureWidth,
            paramPictureHeight,
            rect.x + rect.width / 2 - bitmap.width / 2,
            rect.y + rect.height / 2 - bitmap.height / 2
          );
          // ウィンドウにテキストを描画
          this.drawItemName(
            skill,
            rect.x + rect.width / 2 - paramPictureWidth / 2 + 8,
            rect.y - this.lineHeight() / 4,
            paramPictureWidth - 16
          );
          this.drawSkillCost(
            skill,
            rect.x + rect.width / 2 - paramPictureWidth / 2 - 8,
            rect.y + this.lineHeight() / 4,
            paramPictureWidth
          );
          this.changePaintOpacity(1);
        }.bind(this)
      );
    }
  };

  Window_BattleSkill.prototype.itemHeight = function () {
    return paramPictureHeight + 8;
  };

  Window_BattleSkill.prototype.lineHeight = function () {
    return paramPictureHeight - 16;
  };

  Window_BattleSkill.prototype.maxCols = function () {
    return 4;
  };

  Window_BattleSkill.prototype.translucentOpacity = function () {
    return 100;
  };

  // --------------------------------------------------------
  // Window_BattleEnemy
  // --------------------------------------------------------

  Window_BattleEnemy.prototype.drawItem = function (index) {
    this.resetTextColor();
    const name = this._enemies[index].name();
    const rect = this.itemLineRect(index);

    // コマンド画像を読み込み
    const bitmap = ImageManager.loadPicture(paramFileEnemy);
    // コマンド画像の読み込みが完了したら
    bitmap.addLoadListener(
      function () {
        // ウィンドウにコマンド画像を描画
        this.contents.blt(
          bitmap,
          0,
          0,
          paramPictureWidth,
          paramPictureHeight,
          rect.x + rect.width / 2 - bitmap.width / 2,
          rect.y + rect.height / 2 - bitmap.height / 2
        );
        // エネミーの名前を描画
        this.drawText(
          name,
          rect.x + rect.width / 2 - paramPictureWidth / 2 + 8,
          rect.y,
          paramPictureWidth - 16
        );
      }.bind(this)
    );
  };

  Window_BattleEnemy.prototype.itemHeight = function () {
    return paramPictureHeight + 8;
  };

  Window_BattleEnemy.prototype.lineHeight = function () {
    return paramPictureHeight - 16;
  };

  Window_BattleEnemy.prototype.maxCols = function () {
    return 3;
  };
})();
