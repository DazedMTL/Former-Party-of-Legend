﻿//=============================================================================
// NRP_VisualTurn.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.11 The order of actions is displayed on the battle screen.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/472840225.html
 *
 * @help This plugin performs the same screen display process as CTB and CTTB.
 * Be sure to place this plugin below the plugins that control those turns.
 *
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/472840225.html
 *
 * <Terms>
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 *
 * @param <Window>
 *
 * @param dispNumber
 * @parent <Window>
 * @type number
 * @desc The number of battler to be displayed in the order. If not specified, the value of the plugin that provides turn control is used.
 *
 * @param horizon
 * @text horizontal window
 * @parent <Window>
 * @type select
 * @option 0:Vertical @value 0
 * @option 1:Horizontal @value 1
 * @default 0
 * @desc Changes the display direction of the action order window.
 * 0:vertical 1:horizontal
 *
 * @param autoHidden
 * @parent <Window>
 * @type select
 * @option 0:Not Hidden @value 0
 * @option 1:Hidden @value 1
 * @default 0
 * @desc 1 hides the action order window when executing actions.
 * This is useful if you want to avoid overlapping with messages.
 *
 * @param adjustX
 * @parent <Window>
 * @type text
 * @default 0
 * @desc Move the action order window to the right.
 * "Graphics.boxWidth - this.width" can be used to align it to the right.
 *
 * @param adjustY
 * @parent <Window>
 * @type text
 * @default 64
 * @desc Move the action order window to the bottom. "Graphics.boxHeight - this._statusWindow.height - this.height" can be used to align it to the bottom.
 *
 * @param windowPadding
 * @parent <Window>
 * @type number
 * @desc Action order window margins. Default = 18.
 *
 * @param windowOpacity
 * @parent <Window>
 * @type number
 * @default 255
 * @desc The opacity of the window.
 * 0 for transparent, 255 for opaque.
 *
 * @param windowDark
 * @parent <Window>
 * @type select
 * @option 0:Normal @value 0
 * @option 1:Dark @value 1
 * @default 0
 * @desc If 1, darken the window.
 *
 * @param windowBackImage
 * @parent <Window>
 * @type file
 * @dir img/pictures
 * @desc You can specify a picture as the background of the window.
 * This can be combined with window transparency.
 *
 * @param <Symbol Image>
 *
 * @param graphicMode
 * @parent <Symbol Image>
 * @type select
 * @option 0:Name @value 0
 * @option 1:Face @value 1
 * @option 2:Character @value 2
 * @option 3:SV Battler @value 3
 * @default 1
 * @desc Graphic display mode.
 * 0:Name, 1:Face, 2:Character, 3:SV Battler
 *
 * @param width
 * @parent <Symbol Image>
 * @type number
 * @default 100
 * @desc This is the width to display the symbol image.
 * 100 if you don't specify it.
 *
 * @param height
 * @parent <Symbol Image>
 * @type number
 * @default 32
 * @desc This is the height to display the symbol image.
 * 32 if you don't specify it.
 *
 * @param zoom
 * @parent <Symbol Image>
 * @type number
 * @default 100
 * @desc Magnification of the symbol image.
 * Set it to 100 as the standard.
 *
 * @param characterDirection
 * @parent <Symbol Image>
 * @type select
 * @default down
 * @option @value down
 * @option @value left
 * @option @value right
 * @option @value up
 * @desc Direction for displaying the character image.
 * It is meaningless in any mode other than character display.
 *
 * @param actorBackImage
 * @parent <Symbol Image>
 * @type file
 * @dir img/pictures
 * @desc Specify a picture as a background for each actor.
 *
 * @param <Enemy Symbol Image>
 *
 * @param enemyGraphicMode
 * @parent <Enemy Symbol Image>
 * @type select
 * @option None @value
 * @option 0:Name @value 0
 * @option 1:Face @value 1
 * @option 2:Character @value 2
 * @option 3:SV Battler @value 3
 * @option 4:Picture @value 4
 * @desc Enemy graphic mode, same as Actors when played with None.
 *
 * @param enemyFileName
 * @parent <Enemy Symbol Image>
 * @type string
 * @default Monster
 * @desc Default file name of the enemy symbol. The target folder depends on the graphic mode. If not specified, it is "Monster".
 *
 * @param enemyFileIndex
 * @parent <Enemy Symbol Image>
 * @type number
 * @default 6
 * @desc Specify the index of the image specified by enemyFileName.
 * Note that this starts at 0. If you don't specify it, it's 6.
 *
 * @param enemyBackImage
 * @parent <Enemy Symbol Image>
 * @type file
 * @dir img/pictures
 * @desc Specify a picture for the background of each enemy.
 *
 * @param <Enemy Visual ID>
 *
 * @param useVisualId
 * @parent <Enemy Visual ID>
 * @type boolean
 * @default false
 * @desc Displays the identifier(A,B,C..) above the enemy symbol.
 * Also, Change the notation on the enemy selection window.
 *
 * @param visualIdSize
 * @parent <Enemy Visual ID>
 * @type number
 * @default 28
 * @desc The font size of the identifier.
 * If not specified, it is 28.
 *
 * @param visualIdColor
 * @parent <Enemy Visual ID>
 * @type number
 * @default 0
 * @desc The number of the character color used for the identifier.
 * The number corresponds to the system image.
 *
 * @param visualIdArray
 * @parent <Enemy Visual ID>
 * @type text
 * @default ABCDEFGHIJKLMNOPQRSTUVWXYZ
 * @desc An array of identifiers to use.
 *
 * @param <Other>
 *
 * @param keepCommandWindow
 * @parent <Other>
 * @type boolean
 * @default true
 * @desc Doesn't hide the command window after the input is completed.
 * If you don't want the window at the bottom of the screen to be busy.
 *
 * @param displayForSkillSelect
 * @text Display control for skill selection
 * @parent <Other>
 * @type select
 * @option 0:Standard (displayed only when target is selected) @value 0
 * @option 1:Always display @value 1
 * @default 0
 * @desc Controls how the window appears when a skill is selected.
 * Standard: Hide help when selecting a target to display the window.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.11 行動順序を戦闘画面へ表示します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/472840225.html
 *
 * @help CTBやCTTBに共通した画面表示処理を行います。
 * このプラグインは必ずターン制御を行うプラグインよりも下に配置してください。
 *
 * 細かい仕様については、以下をご覧ください。
 * http://newrpg.seesaa.net/article/472840225.html
 *
 * 【利用規約】
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 *
 * @param <Window>
 * @text ＜ウィンドウ関連＞
 * @desc 見出しです。
 *
 * @param dispNumber
 * @text 表示人数
 * @parent <Window>
 * @type number
 * @desc 順序表示を行う人数。
 * 指定がない場合、連携元プラグインの値を使用します。
 *
 * @param horizon
 * @text ウィンドウの表示方向
 * @parent <Window>
 * @type select
 * @option 0:縦長 @value 0
 * @option 1:横長 @value 1
 * @default 0
 * @desc 行動順序の表示方向を切り替えます。
 * 0:縦長ウィンドウ、1:横長ウィンドウ
 *
 * @param autoHidden
 * @text ウィンドウを自動で隠す
 * @parent <Window>
 * @type select
 * @option 0:枠を隠さない @value 0
 * @option 1:枠を隠す @value 1
 * @default 0
 * @desc 1ならば行動実行時、自動的に行動順序表示枠を隠します。
 * メッセージとかぶって邪魔な場合などに。
 *
 * @param adjustX
 * @text 横位置調整
 * @parent <Window>
 * @type text
 * @default 0
 * @desc 行動順序ウィンドウの位置を右方向に移動します。
 * "Graphics.boxWidth - this.width"で右寄せにできます。
 *
 * @param adjustY
 * @text 縦位置調整
 * @parent <Window>
 * @type text
 * @default 64
 * @desc 行動順序ウィンドウを下へ移動します。"Graphics.boxHeight - this._statusWindow.height - this.height"で下寄せ可。
 *
 * @param windowPadding
 * @text ウィンドウの余白
 * @parent <Window>
 * @type number
 * @desc 行動順序ウィンドウの余白を指定します。初期値=18。
 *
 * @param windowOpacity
 * @text 不透明度
 * @parent <Window>
 * @type number
 * @default 255
 * @desc 枠の不透明度です。
 * 0で透明、255で不透明。
 *
 * @param windowDark
 * @text 暗くするか？
 * @parent <Window>
 * @type select
 * @option 0:通常 @value 0
 * @option 1:暗くする @value 1
 * @default 0
 * @desc 1ならばウィンドウを暗くします。
 *
 * @param windowBackImage
 * @text 背景画像
 * @parent <Window>
 * @type file
 * @dir img/pictures
 * @desc ウィンドウの上に背景となるピクチャーを指定します。
 * 例えばウィンドウ透明化と組み合わせて独自の枠を作れます。
 *
 * @param <Symbol Image>
 * @text ＜画像関連＞
 * @desc 見出しです。
 *
 * @param graphicMode
 * @text 画像表示モード
 * @parent <Symbol Image>
 * @type select
 * @option 0:名前表示 @value 0
 * @option 1:顔グラ表示 @value 1
 * @option 2:キャラグラ表示 @value 2
 * @option 3:SV戦闘キャラ表示 @value 3
 * @default 1
 * @desc 画像表示モードです。0:名前表示、1:顔グラ表示、2:キャラグラ表示、3:SV戦闘キャラ。
 *
 * @param width
 * @text 横幅
 * @parent <Symbol Image>
 * @type number
 * @default 100
 * @desc シンボル画像の表示横幅です。指定なしなら100。
 *
 * @param height
 * @text 縦幅
 * @parent <Symbol Image>
 * @type number
 * @default 32
 * @desc シンボル画像の表示縦幅です。指定なしなら32。
 *
 * @param zoom
 * @text 表示倍率
 * @parent <Symbol Image>
 * @type number
 * @default 100
 * @desc シンボル画像の拡大率です。
 * 100を基準に設定してください。
 *
 * @param characterDirection
 * @text キャラグラの向き
 * @parent <Symbol Image>
 * @type select
 * @default down
 * @option 下 @value down
 * @option 左 @value left
 * @option 右 @value right
 * @option 上 @value up
 * @desc キャラグラ表示の場合の向きです。
 * キャラグラ表示以外のモードでは無意味です。
 *
 * @param actorBackImage
 * @text 背景画像
 * @parent <Symbol Image>
 * @type file
 * @dir img/pictures
 * @desc 味方個別の背景となるピクチャーを指定します。
 *
 * @param <Enemy Symbol Image>
 * @text ＜敵の画像関連＞
 * @desc 見出しです。
 *
 * @param enemyGraphicMode
 * @text 画像表示モード
 * @parent <Enemy Symbol Image>
 * @type select
 * @option 指定なし @value
 * @option 0:名前表示 @value 0
 * @option 1:顔グラ表示 @value 1
 * @option 2:キャラグラ表示 @value 2
 * @option 3:SV戦闘キャラ表示 @value 3
 * @option 4:ピクチャー表示 @value 4
 * @desc 敵の画像表示モードです。0:名前,1:顔グラ,2:キャラグラ,3:SV戦闘キャラ,4:ピクチャー。指定なしなら味方と同じ。
 *
 * @param enemyFileName
 * @text 画像ファイル
 * @parent <Enemy Symbol Image>
 * @type string
 * @default Monster
 * @desc 敵シンボルのデフォルトファイル名。
 * 対象フォルダは表示モードに依存。指定なしなら"Monster"。
 *
 * @param enemyFileIndex
 * @text 画像のインデックス
 * @parent <Enemy Symbol Image>
 * @type number
 * @default 6
 * @desc enemyFileNameで指定した画像のインデックスを指定する。
 * 顔グラ・キャラグラ以外は不要。0始まり注意。指定なしなら6。
 *
 * @param enemyBackImage
 * @text 背景画像
 * @parent <Enemy Symbol Image>
 * @type file
 * @dir img/pictures
 * @desc 敵個別の背景となるピクチャーを指定します。
 *
 * @param <Enemy Visual ID>
 * @text ＜敵の識別子関連＞
 * @desc 見出しです。
 *
 * @param useVisualId
 * @text 識別子を表示
 * @parent <Enemy Visual ID>
 * @type boolean
 * @default false
 * @desc 敵シンボルの右下に識別子(A,B,C..)を表示します
 * また、敵選択ウィンドウの表記を併せて変更します。
 *
 * @param visualIdSize
 * @text 識別子のサイズ
 * @parent <Enemy Visual ID>
 * @type number
 * @default 28
 * @desc 識別子のフォントサイズです。
 * 未指定の場合は28となります。
 *
 * @param visualIdColor
 * @text 識別子の色
 * @parent <Enemy Visual ID>
 * @type number
 * @default 0
 * @desc 識別子に用いる文字色の番号です。
 * 番号はシステム画像に対応します。
 *
 * @param visualIdArray
 * @text 識別子の配列
 * @parent <Enemy Visual ID>
 * @type text
 * @default ABCDEFGHIJKLMNOPQRSTUVWXYZ
 * @desc 使用する識別子の配列です。
 *
 * @param <Other>
 * @text ＜その他＞
 * @desc 見出しです。
 *
 * @param keepCommandWindow
 * @text コマンドを隠さない
 * @parent <Other>
 * @type boolean
 * @default true
 * @desc 入力完了後にコマンドウィンドウを隠しません。
 * 画面下のウィンドウがせわしないのは嫌だという場合に。
 *
 * @param displayForSkillSelect
 * @text スキル選択時の表示制御
 * @parent <Other>
 * @type select
 * @option 0:標準（対象選択時のみ表示） @value 0
 * @option 1:常に表示 @value 1
 * @default 0
 * @desc スキル（アイテム）選択時、行動順序の表示方法を制御します。
 * 標準なら、対象選択時のみヘルプを消去して順序を表示します。
 */

(function () {
  "use strict";

  function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
  }
  function setDefault(str, def) {
    return str ? str : def;
  }
  function toBoolean(val, def) {
    if (val == "" || val == undefined) {
      return def;
    } else if (typeof val === "boolean") {
      return val;
    }
    return val.toLowerCase() == "true";
  }

  var parameters = PluginManager.parameters("NRP_VisualTurn");

  var paramDispNumber = toNumber(parameters["dispNumber"], 0);
  var paramHorizon = toNumber(parameters["horizon"], 0);
  var paramAutoHidden = toNumber(parameters["autoHidden"], 0);
  var paramAdjustX = setDefault(parameters["adjustX"], 0);
  var paramAdjustY = setDefault(parameters["adjustY"], 0);
  var paramWindowPadding = toNumber(parameters["windowPadding"], 18);
  var paramWindowOpacity = toNumber(parameters["windowOpacity"], 255);
  var paramWindowDark = toNumber(parameters["windowDark"], 0);
  var paramWindowBackImage = parameters["windowBackImage"];

  var paramGraphicMode = toNumber(parameters["graphicMode"], 1);
  var paramEnemyGraphicMode = parameters["enemyGraphicMode"];
  var paramWidth = toNumber(parameters["width"], 114);
  var paramHeight = toNumber(parameters["height"], 32);
  var paramZoom = toNumber(parameters["zoom"], 100) / 100;
  var paramCharacterDirection = setDefault(
    parameters["characterDirection"],
    "down"
  );
  var paramActorBackImage = parameters["actorBackImage"];

  var paramEnemyFileName = setDefault(parameters["enemyFileName"], "Monster");
  var paramEnemyFileIndex = toNumber(parameters["enemyFileIndex"], 6);
  var paramEnemyBackImage = parameters["enemyBackImage"];

  var paramUseVisualId = toBoolean(parameters["useVisualId"], false);
  var paramVisualIdSize = toNumber(parameters["visualIdSize"], 0);
  var paramVisualIdColor = toNumber(parameters["visualIdColor"], 0);
  var paramVisualIdArray = setDefault(
    parameters["visualIdArray"],
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  );

  var paramKeepCommandWindow = toBoolean(
    parameters["keepCommandWindow"],
    false
  );

  var paramDisplayForSkillSelect = setDefault(
    parameters["displayForSkillSelect"],
    0
  );

  // CTTB用のターン参加人数
  var cttbCount = -1;

  /**
   * ●行動順序の作成
   */
  var _BattleManager_makeActionOrders = BattleManager.makeActionOrders;
  BattleManager.makeActionOrders = function () {
    _BattleManager_makeActionOrders.call(this);

    // 有効なら数字が入るので、CTTBかどうかの判定に使う。
    cttbCount = this._cttbCount;

    // 表示処理を呼び出し。
    NrpVisualTurn.visualTurnList(this._actionBattlers);
  };

  function NrpVisualTurn() {
    throw new Error("This is a static class");
  }

  /**
   * ●CTB用ウィンドウの定義
   */
  function Window_BattleCtb() {
    this.initialize.apply(this, arguments);
  }

  Window_BattleCtb.prototype = Object.create(Window_Base.prototype);
  Window_BattleCtb.prototype.constructor = Window_BattleCtb;

  /**
   * ●CTB用ウィンドウの初期化
   */
  Window_BattleCtb.prototype.initialize = function () {
    var width = 0;
    var height = 0;
    var padding = this.standardPadding();

    // 縦
    if (paramHorizon == 0) {
      width = paramWidth + padding * 2;
      // この時点ではサイズ不明なので画面いっぱいまで確保する。
      // （行動順リストが設定されていないため）
      // ここで確保しておかないと初期描画ができない。
      height = Graphics.boxHeight;

      // 横
    } else if (paramHorizon == 1) {
      // この時点ではサイズ不明なので画面いっぱいまで確保する。
      width = Graphics.boxWidth;
      height = paramHeight + padding * 2;
    }

    // MVの場合
    if (Utils.RPGMAKER_NAME == "MV") {
      Window_Base.prototype.initialize.call(this, 0, 0, width, height);

      // MZの場合
    } else {
      Window_Base.prototype.initialize.call(
        this,
        new Rectangle(0, 0, width, height)
      );
    }

    // 余白設定
    this.padding = padding;
  };

  /**
   * ●CTB用ウィンドウのサイズを参照して位置を調整
   */
  Window_BattleCtb.prototype.setPositionBySize = function () {
    var winX = eval(paramAdjustX);
    var winY = eval(paramAdjustY);
    this.move(winX, winY, this.width, this.height);
  };

  /**
   * ●CTB用ウィンドウの余白
   */
  Window_BattleCtb.prototype.standardPadding = function () {
    return paramWindowPadding;
  };

  /**
   * ●CTB用ウインドウの設定
   */
  NrpVisualTurn.setCtbWindow = function (ctbWindow) {
    this._ctbWindow = ctbWindow;
  };

  /**
   * 戦闘画面用にWindowを追加する。
   */
  var _Scene_Battle_prototype_createAllWindows =
    Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function () {
    _Scene_Battle_prototype_createAllWindows.apply(this, arguments);

    this.createCtbWindow();
  };

  /**
   * 戦闘表示関連の準備
   */
  var _Scene_Battle_prototype_createDisplayObjects =
    Scene_Battle.prototype.createDisplayObjects;
  Scene_Battle.prototype.createDisplayObjects = function () {
    _Scene_Battle_prototype_createDisplayObjects.apply(this, arguments);

    // NrpVisualTurnから呼び出せるようにCTBウインドウをセット。
    NrpVisualTurn.setCtbWindow(this._ctbWindow);

    // 各背景画像を先読みしておく。
    // 各画像シンボルよりも確実に後ろに表示させるため。
    if (paramWindowBackImage) {
      ImageManager.loadPicture(paramWindowBackImage);
    }
    if (paramActorBackImage) {
      ImageManager.loadPicture(paramActorBackImage);
    }
    if (paramEnemyBackImage) {
      ImageManager.loadPicture(paramEnemyBackImage);
    }

    // 全メンバーの順序用画像を読込
    for (const battler of BattleManager.allBattleMembers()) {
      this._ctbWindow.loadBitmap(battler);
    }
  };

  /**
   * CTB行動順序ウィンドウ作成処理
   */
  Scene_Battle.prototype.createCtbWindow = function () {
    this._ctbWindow = new Window_BattleCtb();
    // 参照用にステータスウィンドウを持たせる。（強引かも……）
    this._ctbWindow._statusWindow = this._statusWindow;
    this._ctbWindow.hide(); // 非表示しておく
    this._ctbWindow.close(); // 閉じておく

    this.addWindow(this._ctbWindow);
  };

  /**
   * ● 行動順序リストの表示
   */
  NrpVisualTurn.visualTurnList = function (actionBattlers) {
    var win = this._ctbWindow;
    var dispNumber = getDispNumber();

    /*
     * ウィンドウの位置とサイズを設定
     */
    var xSize = 0;
    var ySize = 0;
    var padding = win.padding * 2; // ウィンドウの余白サイズ

    // 縦
    if (paramHorizon == 0) {
      xSize = paramWidth + padding;
      ySize = dispNumber * paramHeight + padding;

      // 【CTTB用】境界線用の間隔を加算
      if (cttbCount > 0 && cttbCount < dispNumber) {
        ySize += 32;
      }

      // 横
    } else if (paramHorizon == 1) {
      xSize = dispNumber * paramWidth + padding;
      // 【CTTB用】境界線用の間隔を加算
      if (cttbCount > 0 && cttbCount < dispNumber) {
        xSize += 32;
      }

      ySize = paramHeight + padding;
    }

    // ウィンドウの位置・サイズ変更を実行
    win.width = xSize;
    win.height = ySize;
    win.setPositionBySize();

    // 暗くするかどうか。
    win.setBackgroundType(paramWindowDark);

    win.contents.clear(); // 表示クリア
    win.opacity = paramWindowOpacity; // 不透明度の設定

    // 背景画像の設定
    win.drawWindowBackImage();

    /*
     * バトラー名を表示
     */
    var x = 0;
    var y = 0;

    for (var i = 0; i < dispNumber; i++) {
      var battler = actionBattlers[i];

      // 【CTTB用】ターン外のキャラとは隙間を空ける
      if (cttbCount == i) {
        // 縦表示
        if (paramHorizon == 0) {
          y += 16;
          this.drawCttbBorder(battler, x, y);
          y += 16;
          // 横表示
        } else {
          x += 16;
          this.drawCttbBorder(battler, x, y);
          x += 16;
        }
      }

      // キャラ描画
      this.drawCtbBattler(battler, x, y, dispNumber, i);

      // 縦表示
      if (paramHorizon == 0) {
        y += paramHeight;
        // 横表示
      } else {
        x += paramWidth;
      }
    }
  };

  /**
   * ●表示人数を取得
   */
  function getDispNumber() {
    var actionBattlersLength = BattleManager._actionBattlers.length;
    var dispNumber = paramDispNumber;

    // パラメータの表示人数が未定義
    // または、連携先の計算人数がパラメータの表示人数を下回る場合
    if (!paramDispNumber || actionBattlersLength < paramDispNumber) {
      dispNumber = actionBattlersLength;
    }
    return dispNumber;
  }

  /**
   * ● 行動順序用、バトラーの描画
   */
  NrpVisualTurn.drawCtbBattler = function (battler, x, y, battlersLength, i) {
    var win = this._ctbWindow;
    var opacity = 255;

    // 【CTTB用】ターン外だと半透明
    if (i >= cttbCount) {
      opacity = 150;
    } else {
      opacity = 255; // 通常
    }

    // 背景描画
    if (win.drawPersonalBackImage(battler, x, y)) {
      // 背景描画に成功したら。シンボル画像表示
      win.drawInterval(battler, x, y, paramWidth, paramHeight, opacity);
      return;
    }

    // 失敗なら、背景描画の成功を待ってから、シンボル画像表示を行う。
    // この調整をしておかないと、稀に表示が前後する。
    var interval = setInterval(function () {
      if (win.drawPersonalBackImage(battler, x, y)) {
        win.drawInterval(battler, x, y, paramWidth, paramHeight, opacity);
        clearInterval(interval);
      }
    }, 1000); //1秒間隔
  };

  /**
   * ●表示モードを取得する。
   */
  NrpVisualTurn.getGraphicMode = function (battler) {
    var graphicMode = paramGraphicMode;
    // 敵のグラフィックモードに指定があれば取得
    if (!battler.isActor() && paramEnemyGraphicMode != "") {
      graphicMode = paramEnemyGraphicMode;
    }
    return graphicMode;
  };

  /**
   * ●CTB用の名前表示
   * ※ウィンドウ縦表示専用。横表示だとバグります。
   */
  Window_BattleCtb.prototype.drawName = function (
    battler,
    x,
    y,
    width,
    height,
    opacity
  ) {
    var name = battler.name();
    if (battler.isActor()) {
      this.changeTextColor(this.textColor(0)); // 文字色設定
    } else {
      this.changeTextColor(this.textColor(2)); // 文字色設定
    }
    this.contents.paintOpacity = opacity;

    var dy = y;

    var ph = 28; // 文字の縦幅

    // 中央に来るように描画位置を調整。※中央線を求め、そこから文字縦幅/2 ほど上にずらす。
    dy = y + height / 2 - ph / 2;
    dy -= 2; // 元が下寄せっぽいので微調整

    this.drawText(name, x, dy, this.contentsWidth(), "left");

    // 対象選択時の白枠表示
    if (battler._selected) {
      this.drawSelected(x, dy + 2, width, ph + 4);
    }
  };

  /**
   * ●clearIntervalによって、準備完了を待って描画を行う。
   */
  Window_BattleCtb.prototype.drawInterval = function (
    battler,
    x,
    y,
    width,
    height,
    opacity
  ) {
    var win = this;

    // 表示モードによって判断し、bitmapを読み込む。
    var bitmap = this.loadBitmap(battler);

    var graphicMode = this._graphicMode;
    // loadBitmapで取得した顔グラ、キャラグラ用のインデックス
    var imageIndex = this._imageIndex;

    // キャラグラ用のビッグ判定
    var isBigCharacter = this._isBigCharacter;

    // 名前表示なら制御せずそのまま描画
    if (graphicMode == 0) {
      win.drawName(battler, x, y, paramWidth, paramHeight, opacity);
      return;
    }

    // 描画成功なら終了
    if (ImageManager.isReady()) {
      win.drawSymbol(
        bitmap,
        imageIndex,
        isBigCharacter,
        battler,
        x,
        y,
        width,
        height,
        opacity,
        graphicMode
      );
      return;
    }

    // 失敗した場合、準備完了を待って描画を行う。（念のため）
    var interval = setInterval(function () {
      if (ImageManager.isReady()) {
        win.drawSymbol(
          bitmap,
          imageIndex,
          isBigCharacter,
          battler,
          x,
          y,
          width,
          height,
          opacity,
          graphicMode
        );

        clearInterval(interval);
      }
    }, 1000); //1秒間隔
  };

  /**
   * ●表示モードによって判断し、bitmapを読み込む。
   */
  Window_BattleCtb.prototype.loadBitmap = function (battler) {
    var imageName;
    var imageIndex;
    var bitmap;
    var data;

    this._graphicMode = null; // 現在対象とする画像表示モード
    this._imageIndex = null; // 画像インデックス
    this._isBigCharacter = false; // キャラグラ用のビッグキャラクター判定用

    // メタタグの存在チェック（最優先）
    if (battler.isActor()) {
      data = $dataActors[battler.actorId()];
    } else {
      data = $dataEnemies[battler.enemyId()];
    }

    //---------------------------------
    // 各画像をメタタグから取得できるか？
    // 取得できればそちらを優先。
    //---------------------------------
    // 顔グラ
    imageName = NrpVisualTurn.getMetaImageName(this, data, "CtbFace");
    if (imageName) {
      this._graphicMode = 1;
      return ImageManager.loadFace(imageName);
    }
    // キャラグラ
    imageName = NrpVisualTurn.getMetaImageName(this, data, "CtbCharacter");
    if (imageName) {
      this._graphicMode = 2;
      bitmap = ImageManager.loadCharacter(imageName);
      this._isBigCharacter = ImageManager.isBigCharacter(imageName);
      return bitmap;
    }
    // SV戦闘キャラ
    imageName = NrpVisualTurn.getMetaImageName(this, data, "CtbSvActor");
    if (imageName) {
      this._graphicMode = 3;
      return ImageManager.loadSvActor(imageName);
    }
    // ピクチャー
    imageName = NrpVisualTurn.getMetaImageName(this, data, "CtbPicture");
    if (imageName) {
      this._graphicMode = 4;
      return ImageManager.loadPicture(imageName);
    }

    var graphicMode = NrpVisualTurn.getGraphicMode(battler);

    // 0:名前表示
    if (graphicMode == 0) {
      bitmap = null;

      // 1:顔グラ表示
    } else if (graphicMode == 1) {
      if (battler.isActor()) {
        imageName = battler._faceName;
        imageIndex = battler._faceIndex;
      } else {
        imageName = paramEnemyFileName;
        imageIndex = paramEnemyFileIndex;
      }
      bitmap = ImageManager.loadFace(imageName);

      // 2:キャラグラ表示
    } else if (graphicMode == 2) {
      if (battler.isActor()) {
        imageName = battler._characterName;
        imageIndex = battler._characterIndex;
      } else {
        imageName = paramEnemyFileName;
        imageIndex = paramEnemyFileIndex;
      }
      bitmap = ImageManager.loadCharacter(imageName);
      this._isBigCharacter = ImageManager.isBigCharacter(imageName);

      // 3:SV表示
    } else if (graphicMode == 3) {
      if (battler.isActor()) {
        imageName = battler.battlerName();
      } else {
        imageName = paramEnemyFileName;
      }
      bitmap = ImageManager.loadSvActor(imageName);

      // 4:ピクチャー表示
    } else if (graphicMode == 4) {
      if (!battler.isActor()) {
        imageName = paramEnemyFileName;
      }
      bitmap = ImageManager.loadPicture(imageName);
    }

    this._graphicMode = graphicMode;
    this._imageIndex = imageIndex;
    return bitmap;
  };

  /**
   * ●メタタグ名を元に画像ファイル名を取得する。
   */
  NrpVisualTurn.getMetaImageName = function (win, data, metaTagName) {
    var imageName = null;
    var metaValue = data.meta[metaTagName];

    // 画像の指定があれば、そちらを取得する。
    if (metaValue) {
      imageName = this.getMetaImageNameSwitch(
        win,
        metaValue,
        metaTagName,
        imageName
      );

      // 連番が取得できた場合、そちらを優先
      for (var i = 1; data.meta.hasOwnProperty(metaTagName + i); i++) {
        metaValue = data.meta[metaTagName + i];
        imageName = this.getMetaImageNameSwitch(
          win,
          metaValue,
          metaTagName,
          imageName
        );
      }
    }
    return imageName;
  };

  /**
   * ●スイッチを考慮して画像ファイル名を取得する。
   */
  NrpVisualTurn.getMetaImageNameSwitch = function (
    win,
    metaValue,
    metaTagName,
    defaultImageName
  ) {
    var imageName = defaultImageName;
    var switchNo;

    // キャラグラ、顔グラの場合、
    // <CtbFace:Monster,6,10>というようにファイル名、インデックス、ゲーム内スイッチ番号の順番を想定。
    // ゲーム内スイッチ番号は省略可能。
    if (metaTagName == "CtbCharacter" || metaTagName == "CtbFace") {
      // スイッチ番号を取得
      switchNo = metaValue.split(",")[2];
      // スイッチ指定があり、かつ満たしている場合
      if (switchNo && $gameSwitches.value(switchNo)) {
        imageName = metaValue.split(",")[0];
        win._imageIndex = metaValue.split(",")[1]; // インデックス

        // スイッチ指定がない場合は普通に取得
      } else if (!switchNo) {
        imageName = metaValue.split(",")[0];
        win._imageIndex = metaValue.split(",")[1]; // インデックス
      }

      // それ以外の場合、
      // <CtbPicture:Monster,10>というようにファイル名、ゲーム内スイッチ番号の順番を想定
      // ゲーム内スイッチは省略可能。
    } else {
      // スイッチ番号を取得
      switchNo = metaValue.split(",")[1];
      // スイッチ指定があり、かつ満たしている場合
      if (switchNo && $gameSwitches.value(switchNo)) {
        imageName = metaValue.split(",")[0];

        // スイッチ指定がない場合は普通に取得
      } else if (!switchNo) {
        imageName = metaValue;
      }
    }

    return imageName;
  };

  /**
   * ●CTB用のシンボル表示
   */
  Window_BattleCtb.prototype.drawSymbol = function (
    bitmap,
    imageIndex,
    isBigCharacter,
    battler,
    x,
    y,
    width,
    height,
    opacity,
    graphicMode
  ) {
    // 1:顔グラ表示
    if (graphicMode == 1) {
      this.drawFace(bitmap, imageIndex, battler, x, y, width, height, opacity);

      // 2:キャラグラ表示
    } else if (graphicMode == 2) {
      this.drawCharacter(
        bitmap,
        imageIndex,
        isBigCharacter,
        battler,
        x,
        y,
        width,
        height,
        opacity
      );

      // 3:SV表示
    } else if (graphicMode == 3) {
      this.drawSvActor(bitmap, battler, x, y, width, height, opacity);

      // 4:ピクチャー表示
    } else if (graphicMode == 4) {
      this.drawPicture(bitmap, battler, x, y, width, height, opacity);
    }
  };

  /**
   * ●CTB用の顔グラ表示
   */
  Window_BattleCtb.prototype.drawFace = function (
    bitmap,
    imageIndex,
    battler,
    x,
    y,
    width,
    height,
    opacity
  ) {
    // 規格上の顔グラサイズ
    var imageWidth;
    var imageHeight;

    // MVとMZで定義が違うので考慮
    if (Utils.RPGMAKER_NAME == "MV") {
      imageWidth = Window_Base._faceWidth;
      imageHeight = Window_Base._faceHeight;
    } else {
      imageWidth = ImageManager.faceWidth;
      imageHeight = ImageManager.faceHeight;
    }

    // 最終的に描画するサイズ
    // 収まるなら画像のサイズ、収まらないなら範囲いっぱいまで
    var pw = Math.min(width, imageWidth * paramZoom);
    var ph = Math.min(height, imageHeight * paramZoom);

    // 切り取る画像サイズ
    var sw = Math.floor(pw / paramZoom);
    var sh = Math.floor(ph / paramZoom);

    // 切り取る画像サイズが規格の範囲を超えている。
    // 元のサイズ比率を保ったまま調整する。
    if (sw > imageWidth || sh > imageHeight) {
      if (sw >= sh) {
        sh = Math.floor((sh * imageWidth) / sw);
        sw = imageWidth;
      } else {
        sw = Math.floor((sw * imageHeight) / sh);
        sh = imageHeight;
      }
    }

    // 画像描画位置
    var dx = Math.floor(x + Math.max(width - imageWidth, 0) / 2);
    var dy = Math.floor(y + Math.max(height - imageHeight, 0) / 2);

    // 切り取り開始位置
    var sx = (imageIndex % 4) * imageWidth;
    // 全体を描画できない場合、画像中央を取得するように調整
    if (sw < imageWidth) {
      sx += (imageWidth - sw) / 2;
    }

    var sy = Math.floor(imageIndex / 4) * imageHeight;
    // 全体を描画できない場合、画像中央を取得するように調整
    if (sh < imageHeight) {
      sy += (imageHeight - sh) / 2;
    }

    // 中央に来るように描画位置を調整。※中央線を求め、そこから描画幅/2 ほど左or上にずらす。
    dx = x + width / 2 - pw / 2;
    dy = y + height / 2 - ph / 2;

    this.contents.paintOpacity = opacity;
    // 描画実行
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, pw, ph);

    // 境界線（未使用）
    // this.drawBorderCtb(x, y, width, height, battlersLength, i);

    // 敵の表示用識別子を描画
    this.drawEnemyVisualId(battler, dx, dy, pw, ph);

    // 対象選択時の白枠表示
    if (battler._selected) {
      // 小さいほうに合わせる
      if (pw > width) {
        pw = width;
      }
      if (ph > height) {
        ph = height;
      }
      this.drawSelected(dx, dy, pw, ph);
    }
  };

  /**
   * ●CTB用のキャラグラ表示
   */
  Window_BattleCtb.prototype.drawCharacter = function (
    bitmap,
    imageIndex,
    isBig,
    battler,
    x,
    y,
    width,
    height,
    opacity
  ) {
    // 規格上１キャラの横幅、縦幅
    var imageWidth = bitmap.width / (isBig ? 3 : 12);
    var imageHeight = bitmap.height / (isBig ? 4 : 8);

    // 最終的に描画するサイズ
    // 収まるなら画像のサイズ、収まらないなら範囲いっぱいまで
    var pw = Math.min(width, imageWidth * paramZoom);
    var ph = Math.min(height, imageHeight * paramZoom);

    // 切り取る画像サイズ
    var sw = Math.floor(pw / paramZoom);
    var sh = Math.floor(ph / paramZoom);

    // 切り取る画像サイズが規格の範囲を超えている。
    // 元のサイズ比率を保ったまま調整する。
    if (sw > imageWidth || sh > imageHeight) {
      if (sw >= sh) {
        sh = Math.floor((sh * imageWidth) / sw);
        sw = imageWidth;
      } else {
        sw = Math.floor((sw * imageHeight) / sh);
        sh = imageHeight;
      }
    }

    // 切り取り開始位置（ファイルからキャラ位置を指定）
    var sx = ((imageIndex % 4) * 3 + 1) * imageWidth;
    // 全体を描画できない場合、画像中央を取得するように調整
    if (sw < imageWidth) {
      sx += (imageWidth - sw) / 2;
    }

    var sy = Math.floor(imageIndex / 4) * 4 * imageHeight;

    // 向き調整。
    // ※キャラグラは下、左、右、上の順で格納されているので、その分の高さを加算する。
    if (paramCharacterDirection == "left") {
      sy += imageHeight;
    } else if (paramCharacterDirection == "right") {
      sy += imageHeight * 2;
    } else if (paramCharacterDirection == "up") {
      sy += imageHeight * 3;
    }

    // 中央に来るように描画位置を調整。※中央線を求め、そこから描画幅/2 ほど左or上にずらす。
    var dx = x + width / 2 - pw / 2;
    var dy = y + height / 2 - ph / 2;

    this.contents.paintOpacity = opacity;
    // 描画実行
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, pw, ph);

    // 敵の表示用識別子を描画
    this.drawEnemyVisualId(battler, dx, dy, pw, ph);

    // 対象選択時の白枠表示
    if (battler._selected) {
      // 小さいほうに合わせる
      if (pw > width) {
        pw = width;
      }
      if (ph > height) {
        ph = height;
      }
      this.drawSelected(dx, dy, pw, ph);
    }
  };

  /**
   * ●CTB用のSV戦闘キャラ表示
   */
  Window_BattleCtb.prototype.drawSvActor = function (
    bitmap,
    battler,
    x,
    y,
    width,
    height,
    opacity
  ) {
    // 待機モーションの中央を取得
    var motionIndex = 0;
    var pattern = 1;

    // 規格上１キャラの横幅、縦幅
    var imageWidth = bitmap.width / 9;
    var imageHeight = bitmap.height / 6;

    // 最終的に描画するサイズ
    // 収まるなら画像のサイズ、収まらないなら範囲いっぱいまで
    var pw = Math.min(width, imageWidth * paramZoom);
    var ph = Math.min(height, imageHeight * paramZoom);

    // 切り取る画像サイズ
    var sw = Math.floor(pw / paramZoom);
    var sh = Math.floor(ph / paramZoom);

    // 切り取る画像サイズが規格の範囲を超えている。
    // 元のサイズ比率を保ったまま調整する。
    if (sw > imageWidth || sh > imageHeight) {
      if (sw >= sh) {
        sh = Math.floor((sh * imageWidth) / sw);
        sw = imageWidth;
      } else {
        sw = Math.floor((sw * imageHeight) / sh);
        sh = imageHeight;
      }
    }

    // 画像描画位置
    var dx = Math.floor(x + Math.max(width - imageWidth, 0) / 2);
    var dy = Math.floor(y + Math.max(height - imageHeight, 0) / 2);

    // 切り取り開始位置
    var cx = Math.floor(motionIndex / 6) * 3 + pattern;
    var cy = motionIndex % 6;
    var sx = cx * imageWidth;
    var sy = cy * imageHeight;

    // 全体を描画できない場合、画像中央を取得するように調整
    if (sw < imageWidth) {
      sx += (imageWidth - sw) / 2;
    }
    // 上から取ったほうが自然なため縦側は行わない。
    //    // 全体を描画できない場合、画像中央を取得するように調整
    //    if (sh < imageHeight) {
    //        sy += (imageHeight - sh) / 2;
    //    }

    // 中央に来るように描画位置を調整。※中央線を求め、そこから描画幅/2 ほど左or上にずらす。
    dx = x + width / 2 - pw / 2;
    dy = y + height / 2 - ph / 2;

    this.contents.paintOpacity = opacity;
    // 描画実行
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, pw, ph);

    // 境界線（未使用）
    // this.drawBorderCtb(x, y, width, height, battlersLength, i);

    // 敵の表示用識別子を描画
    this.drawEnemyVisualId(battler, dx, dy, pw, ph);

    // 対象選択時の白枠表示
    if (battler._selected) {
      // 小さいほうに合わせる
      if (pw > width) {
        pw = width;
      }
      if (ph > height) {
        ph = height;
      }
      this.drawSelected(dx, dy, pw, ph);
    }
  };

  /**
   * ●CTB用のピクチャー表示
   */
  Window_BattleCtb.prototype.drawPicture = function (
    bitmap,
    battler,
    x,
    y,
    width,
    height,
    opacity
  ) {
    // 画像の縦幅、横幅
    var imageWidth = bitmap.width;
    var imageHeight = bitmap.height;

    // 最終的に描画するサイズ
    // 収まるなら画像のサイズ、収まらないなら範囲いっぱいまで
    var pw = Math.min(width, imageWidth * paramZoom);
    var ph = Math.min(height, imageHeight * paramZoom);

    // 切り取る画像サイズ
    var sw = Math.floor(pw / paramZoom);
    var sh = Math.floor(ph / paramZoom);

    // 切り取る画像サイズが画像の範囲を超えている。
    // 元のサイズ比率を保ったまま調整する。
    if (sw > imageWidth || sh > imageHeight) {
      if (sw >= sh) {
        sh = Math.floor((sh * imageWidth) / sw);
        sw = imageWidth;
      } else {
        sw = Math.floor((sw * imageHeight) / sh);
        sh = imageHeight;
      }
    }

    // 画像描画位置
    var dx = Math.floor(x + Math.max(width - imageWidth, 0) / 2);
    var dy = Math.floor(y + Math.max(height - imageHeight, 0) / 2);

    // 切り取り開始位置
    var sx = 0;
    var sy = 0;

    // 全体を描画できない場合、画像中央を取得するように調整
    if (sw < imageWidth) {
      sx += (imageWidth - sw) / 2;
    }
    // 全体を描画できない場合、画像中央を取得するように調整
    if (sh < imageHeight) {
      sy += (imageHeight - sh) / 2;
    }

    // 中央に来るように描画位置を調整。※中央線を求め、そこから描画幅/2 ほど左or上にずらす。
    dx = x + width / 2 - pw / 2;
    dy = y + height / 2 - ph / 2;

    this.contents.paintOpacity = opacity;
    // 描画実行
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, pw, ph);

    // 境界線（未使用）
    // this.drawBorderCtb(x, y, width, height, battlersLength, i);

    // 敵の表示用識別子を描画
    this.drawEnemyVisualId(battler, dx, dy, pw, ph);

    // 対象選択時の白枠表示
    if (battler._selected) {
      // 小さいほうに合わせる
      if (pw > width) {
        pw = width;
      }
      if (ph > height) {
        ph = height;
      }
      this.drawSelected(dx, dy, pw, ph);
    }
  };

  /**
   * ●敵の表示用識別子を描画
   */
  Window_BattleCtb.prototype.drawEnemyVisualId = function (
    battler,
    dx,
    dy,
    pw,
    ph
  ) {
    if (!battler.isEnemy() || !paramUseVisualId) {
      return;
    }

    // フォントサイズ指定
    if (paramVisualIdSize) {
      this.contents.fontSize = paramVisualIdSize;
    }
    // 文字色設定
    if (paramVisualIdColor) {
      this.changeTextColor(this.textColor(paramVisualIdColor));
    }
    var y = dy + ph - this.contents.fontSize - 2; // 右下付近
    this.drawText(battler.visualId(), dx, y, pw, "right");
  };

  /**
   * ●表示用識別子を用いる場合のみ関数上書
   */
  if (paramUseVisualId) {
    /**
     * 【関数上書】敵キャラの表示名取得
     */
    Game_Enemy.prototype.name = function () {
      // 入力中は『A:スライム』というように識別子を付ける
      if (BattleManager.isInputting() && this.visualId()) {
        return this.visualId() + ":" + this.originalName();
      }

      // それ以外は本来の名称表示
      // 末尾のアルファベットは不要とする。
      return this.originalName();
    };

    /**
     * 【独自実装】表示用識別子を取得
     */
    Game_Enemy.prototype.visualId = function () {
      var array = paramVisualIdArray.split("");
      var digit = array.length; // 進数
      // 配列長を超えた場合はループ
      return array[this.index() % digit];
    };
  }

  /**
   * ●CTB用の境界線表示（未使用）
   */
  Window_BattleCtb.prototype.drawBorderCtb = function (
    x,
    y,
    width,
    height,
    battlersLength,
    i
  ) {
    // キャラクター同士の境界線を引く
    if (i < battlersLength - 1) {
      var colorNormal = "rgba(255, 255, 255, 1)"; // 不透明の色
      var colorAlpha = "rgba(255, 255, 255, 0.1)"; // 透明寄りの色

      // ウィンドウ縦表示
      if (paramHorizon == 0) {
        var lineY = y + height - 1;
        // 境界線にグラデーションをかけてみる。
        // 左から中央までの線
        this.contents.gradientFillRect(
          x,
          lineY,
          width / 2,
          1,
          colorAlpha,
          colorNormal,
          false
        );
        // 中央から右までの線
        this.contents.gradientFillRect(
          x + width / 2,
          lineY,
          width / 2,
          1,
          colorNormal,
          colorAlpha,
          false
        );

        // ウィンドウ横表示
      } else if (paramHorizon == 1) {
        var lineX = x + width - 1;
        // 境界線にグラデーションをかけてみる。
        // 上から中央までの線
        this.contents.gradientFillRect(
          lineX,
          y,
          1,
          height / 2,
          colorAlpha,
          colorNormal,
          true
        );
        // 中央から下までの線
        this.contents.gradientFillRect(
          lineX,
          y + height / 2,
          1,
          height / 2,
          colorNormal,
          colorAlpha,
          true
        );
      }
    }
  };

  /**
   * ●選択中のキャラは色変え
   */
  Window_BattleCtb.prototype.drawSelected = function (x, y, width, height) {
    // 白の半透明
    var color = "rgba(255, 255, 255, 0.5)";
    this.contents.fillRect(x, y, width, height, color);
  };

  /**
   * ●ウィンドウ全体に表示するピクチャー描画
   */
  Window_BattleCtb.prototype.drawWindowBackImage = function () {
    if (!paramWindowBackImage) {
      return;
    }

    var win = this;
    var bitmap = ImageManager.loadPicture(paramWindowBackImage);

    // 描画成功なら終了
    if (ImageManager.isReady()) {
      win.contents.paintOpacity = 255;
      win.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
      return;
    }

    // 準備完了を待って描画を行う。
    var interval = setInterval(function () {
      if (ImageManager.isReady()) {
        win.contents.paintOpacity = 255;
        win.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
        clearInterval(interval);
      }
    }, 10); //0.01秒間隔
  };

  /**
   * ●アクター・バトラーの背景に表示するピクチャー描画
   */
  Window_BattleCtb.prototype.drawPersonalBackImage = function (battler, x, y) {
    var win = this;
    var bitmap = null;

    // 味方／敵に対応する背景画像があれば読み込む
    if (battler.isActor() && paramActorBackImage) {
      bitmap = ImageManager.loadPicture(paramActorBackImage);
    } else if (!battler.isActor() && paramEnemyBackImage) {
      bitmap = ImageManager.loadPicture(paramEnemyBackImage);
      // どちらもなければ処理しない。
    } else {
      return true;
    }

    // 描画成功なら終了
    if (ImageManager.isReady()) {
      win.contents.paintOpacity = 255;
      win.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y);
      return true;
    }

    return false;
  };

  /**
   * ●スキル（アイテム）選択時の非表示処理
   */
  Window_BattleCtb.prototype.skillHide = function () {
    // 常に表示なら隠さない
    if (paramDisplayForSkillSelect == 1) {
      return;
    }

    // ウィンドウ非表示
    this.hide();
  };

  /**
   * ● 【CTTB用】ターン外境界線の描画
   */
  NrpVisualTurn.drawCttbBorder = function (battler, x, y) {
    var win = this._ctbWindow;
    var borderName = "";

    // 縦表示
    if (paramHorizon == 0) {
      // 境界線表示
      // 線の描画（とりあえず注釈化）
      //win.contents.fillRect(x, y, win.contentsWidth(), 3, borderColor);

      borderName = "-NEXT-";
      win.changeTextColor(win.textColor(6)); // 文字色設定
      win.drawText(borderName, x, y - 16, win.contentsWidth(), "center");

      // 横表示
    } else if (paramHorizon == 1) {
      borderName = "◀";
      win.changeTextColor(win.textColor(6)); // 文字色設定
      win.drawText(
        borderName,
        x - 8,
        y - win.padding * 2 + paramHeight / 2,
        win.contentsWidth(),
        "left"
      );
    }
  };

  /**
   * ●味方の選択時
   */
  var _Window_BattleActor_prototype_select =
    Window_BattleActor.prototype.select;
  Window_BattleActor.prototype.select = function (index) {
    _Window_BattleActor_prototype_select.apply(this, arguments);

    // 対象の選択が有効なら再描画して選択対象を色替え
    if (index >= 0) {
      NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
    }
  };

  /**
   * ●敵の選択を閉じる
   */
  const _Window_BattleActor_hide = Window_BattleActor.prototype.hide;
  Window_BattleActor.prototype.hide = function () {
    _Window_BattleActor_hide.apply(this, arguments);

    // 【MZ対応】選択状態が残らないようにインデックスをクリア
    this._index = null;
  };

  /**
   * ●敵の選択時
   */
  var _Window_BattleEnemy_prototype_select =
    Window_BattleEnemy.prototype.select;
  Window_BattleEnemy.prototype.select = function (index) {
    _Window_BattleEnemy_prototype_select.apply(this, arguments);

    // 対象の選択が有効なら再描画して選択対象を色替え
    if (index >= 0) {
      NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
    }
  };

  /**
   * ●敵の選択を閉じる
   */
  const _Window_BattleEnemy_hide = Window_BattleEnemy.prototype.hide;
  Window_BattleEnemy.prototype.hide = function () {
    _Window_BattleEnemy_hide.apply(this, arguments);

    // 【MZ対応】選択状態が残らないようにインデックスをクリア
    this._index = null;
  };

  /**-------------------------------------------------------------
 * ●以下、状況によってCTBウィンドウの表示・非表示を切り替える。
 *--------------------------------------------------------------/
/**
 * ●パーティコマンド選択開始
 */
  var _Scene_Battle_prototype_startPartyCommandSelection =
    Scene_Battle.prototype.startPartyCommandSelection;
  Scene_Battle.prototype.startPartyCommandSelection = function () {
    _Scene_Battle_prototype_startPartyCommandSelection.call(this); // 元処理呼び出し

    // 行動順序表示
    if (getDispNumber() > 0) {
      this._ctbWindow.show();
      this._ctbWindow.open();
    }
  };

  /**
   * ●コマンド入力開始
   */
  var _BattleManager_startInput = BattleManager.startInput;
  BattleManager.startInput = function () {
    _BattleManager_startInput.apply(this);

    // 行動順序表示
    // パーティコマンドとの重複処理になるけれど、その場合は無視されるので問題ない。
    if (getDispNumber() > 0) {
      NrpVisualTurn._ctbWindow.show();
      NrpVisualTurn._ctbWindow.open();
    }
  };

  /**
   * ●スキル選択画面の表示
   */
  var _Scene_Battle_prototype_commandSkill =
    Scene_Battle.prototype.commandSkill;
  Scene_Battle.prototype.commandSkill = function () {
    _Scene_Battle_prototype_commandSkill.call(this); // 元処理呼び出し

    // CTBウィンドウを非表示
    this._ctbWindow.skillHide();
  };

  /**
   * MZ対応
   * MZかつスキル選択時の表示制御が0:標準の場合
   */
  if (Utils.RPGMAKER_NAME != "MV" && paramDisplayForSkillSelect == 0) {
    /**
     * ●敵の選択開始
     */
    const _Scene_Battle_startEnemySelection =
      Scene_Battle.prototype.startEnemySelection;
    Scene_Battle.prototype.startEnemySelection = function () {
      _Scene_Battle_startEnemySelection.apply(this, arguments);

      // ヘルプを隠して行動順序を表示
      this._helpWindow.hide();
    };

    /**
     * ●味方の選択開始
     */
    const _Scene_Battle_startActorSelection =
      Scene_Battle.prototype.startActorSelection;
    Scene_Battle.prototype.startActorSelection = function () {
      _Scene_Battle_startActorSelection.apply(this, arguments);

      // ヘルプを隠して行動順序を表示
      this._helpWindow.hide();
    };
  }

  /**
   * ●味方選択決定
   */
  var _Scene_Battle_prototype_onActorOk = Scene_Battle.prototype.onActorOk;
  Scene_Battle.prototype.onActorOk = function () {
    _Scene_Battle_prototype_onActorOk.call(this);

    // 対象がクリアされたので再描画
    NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
  };

  /**
   * ●味方選択キャンセル
   */
  var _Scene_Battle_prototype_onActorCancel =
    Scene_Battle.prototype.onActorCancel;
  Scene_Battle.prototype.onActorCancel = function () {
    _Scene_Battle_prototype_onActorCancel.call(this);

    switch (this._actorCommandWindow.currentSymbol()) {
      case "skill":
        // CTBウィンドウを非表示
        this._ctbWindow.skillHide();
        break;
      case "item":
        // CTBウィンドウを非表示
        this._ctbWindow.skillHide();
        break;
    }
  };

  /**
   * ●敵選択決定
   */
  var _Scene_Battle_prototype_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
  Scene_Battle.prototype.onEnemyOk = function () {
    _Scene_Battle_prototype_onEnemyOk.call(this);

    // 対象がクリアされたので再描画
    NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
  };

  /**
   * ●敵選択キャンセル
   */
  var _Scene_Battle_prototype_onEnemyCancel =
    Scene_Battle.prototype.onEnemyCancel;
  Scene_Battle.prototype.onEnemyCancel = function () {
    _Scene_Battle_prototype_onEnemyCancel.call(this);

    switch (this._actorCommandWindow.currentSymbol()) {
      case "attack":
        // 対象が消失したので再描画
        NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
        break;
      case "skill":
        // CTBウィンドウを非表示
        this._ctbWindow.skillHide();
        break;
      case "item":
        // CTBウィンドウを非表示
        this._ctbWindow.skillHide();
        break;
    }
  };

  /**
   * ●スキル選択キャンセル
   */
  var _Scene_Battle_prototype_onSkillCancel =
    Scene_Battle.prototype.onSkillCancel;
  Scene_Battle.prototype.onSkillCancel = function () {
    _Scene_Battle_prototype_onSkillCancel.call(this); // 元処理呼び出し

    // CTBウィンドウを再描画して表示
    NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
    this._ctbWindow.show();
  };

  /**
   * ●アイテム選択画面の表示
   */
  var _Scene_Battle_prototype_commandItem = Scene_Battle.prototype.commandItem;
  Scene_Battle.prototype.commandItem = function () {
    _Scene_Battle_prototype_commandItem.call(this); // 元処理呼び出し

    // CTBウィンドウを非表示
    this._ctbWindow.skillHide();
  };

  /**
   * ●アイテム選択キャンセル
   */
  var _Scene_Battle_prototype_onItemCancel =
    Scene_Battle.prototype.onItemCancel;
  Scene_Battle.prototype.onItemCancel = function () {
    _Scene_Battle_prototype_onItemCancel.call(this); // 元処理呼び出し

    // CTBウィンドウを再描画して表示
    NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
    this._ctbWindow.show();
  };

  /**
   * ●スキル・アイテム選択後、対象の選択へ
   */
  var _Scene_Battle_prototype_onSelectAction =
    Scene_Battle.prototype.onSelectAction;
  Scene_Battle.prototype.onSelectAction = function () {
    _Scene_Battle_prototype_onSelectAction.call(this); // 元処理呼び出し

    // CTBウィンドウを表示
    this._ctbWindow.show();
  };

  /**
   * ●ターン開始処理
   */
  var _BattleManager_startTurn = BattleManager.startTurn;
  BattleManager.startTurn = function () {
    _BattleManager_startTurn.call(this);

    // 行動順序関連表示を閉じる
    if (paramAutoHidden == 1) {
      NrpVisualTurn._ctbWindow.close();
    }
  };

  /**
   * ●行動開始
   */
  var _BattleManager_startAction = BattleManager.startAction;
  BattleManager.startAction = function () {
    // 元の処理
    _BattleManager_startAction.apply(this);

    var item = this._subject.currentAction().item();

    // <CtbHide>の指定があれば、行動順序関連表示を閉じる
    if (item.meta.CtbHide) {
      NrpVisualTurn._ctbWindow.close();
    }
  };

  /**
   * ●行動終了
   */
  var _BattleManager_endAction = BattleManager.endAction;
  BattleManager.endAction = function () {
    _BattleManager_endAction.call(this);

    if (this._action) {
      var item = this._action.item();

      // <CtbHide>の指定があれば、行動順序表示を再開
      // ただし、ウィンドウを隠す設定でない場合のみ
      if (item.meta.CtbHide && paramAutoHidden == 0) {
        NrpVisualTurn._ctbWindow.show();
        NrpVisualTurn._ctbWindow.open();
      }
    }
  };

  /**
   * ●戦闘終了
   */
  var _BattleManager_endBattle = BattleManager.endBattle;
  BattleManager.endBattle = function (result) {
    // 行動順序関連表示削除
    NrpVisualTurn._ctbWindow.close();

    _BattleManager_endBattle.apply(this, arguments);
  };

  /**
   * ●コマンドを隠さない場合
   * ※パラメータがtrueでなければ、関数再定義を行わない。
   */
  if (paramKeepCommandWindow) {
    /**
     * MVの場合
     */
    if (Utils.RPGMAKER_NAME == "MV") {
      /**
       * ●コマンド入力完了
       */
      Scene_Battle.prototype.endCommandSelection = function () {
        this._partyCommandWindow.close();
        // アクターコマンドウィンドウを隠さない。
        // this._actorCommandWindow.close();
        // 選択解除する。
        this._actorCommandWindow.deselect();
        this._statusWindow.deselect();
      };

      /**
       * ●ステータスウィンドウの位置更新
       */
      Scene_Battle.prototype.updateWindowPositions = function () {
        // 初期位置から変更しない。
      };

      /**
       * MZの場合
       */
    } else {
      /**
       * ●コマンド入力完了
       */
      Scene_Battle.prototype.endCommandSelection = function () {
        // アクターコマンドウィンドウを隠さない。
        // this.closeCommandWindows();
        // 選択解除する。
        this._actorCommandWindow.deselect();
        this.hideSubInputWindows();
        this._statusWindow.deselect();
        this._statusWindow.show();
      };

      /**
       * ●ステータスウィンドウの位置更新
       */
      Scene_Battle.prototype.updateStatusWindowPosition = function () {
        // 初期位置から変更しない。
      };

      /**
       * ●スキル表示時
       */
      const _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
      Scene_Battle.prototype.commandSkill = function () {
        _Scene_Battle_commandSkill.apply(this, arguments);

        // アクターコマンドを残すために再表示
        this._actorCommandWindow.show();
      };

      /**
       * ●アイテム表示時
       */
      const _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
      Scene_Battle.prototype.commandItem = function () {
        _Scene_Battle_commandItem.apply(this, arguments);

        // アクターコマンドを残すために再表示
        this._actorCommandWindow.show();
      };
    }
  }

  /**
   * ●MZ対応
   */
  if (Utils.RPGMAKER_NAME != "MV") {
    /**
     * MZではWindow_Base.prototype.textColorが存在しないので、
     * 代替処理を呼び出す。
     */
    Window_BattleCtb.prototype.textColor = function (n) {
      return ColorManager.textColor(n);
    };

    /**
     * 余白定義
     */
    Window_BattleCtb.prototype.updatePadding = function () {
      this.padding = paramWindowPadding;
    };
  }
})();
