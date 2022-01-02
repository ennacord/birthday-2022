import Phaser from 'phaser';
import plugins from './plugins';

class EnnaBirthday {
  constructor(elementId) {
    // Create Phaser game instance
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: elementId,
      banner: false,
      disableContextMenu: false,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 887,
      },
      backgroundColor: Phaser.Display.Color.HexStringToColor('#6c73a7').color,
      plugins,
      scene: {
        preload() {
          // Google Fonts
          this.googleFonts.preload(this.load);
        },
        async create() {
          // Wait for asyncs to finish
          await Promise.all([
            // Configure Google Fonts and let it load specific fonts
            this.googleFonts.configure(),
          ]);

          // Write text with Google font
          this.add.text(100, 100, 'Hello World!', {
            fontFamily: 'Londrina Solid',
            fontSize: 100,
            color: '#ffffff',
            stroke: '#003366',
            strokeThickness: 5,
          });

          // Go fullscreen if not on desktop browser
          if (!this.sys.game.device.os.desktop) {
            // When fullscreen and always lock to landscape
            this.game.scale.once('enterfullscreen', () => {
              // eslint-disable-next-line no-empty
              try { this.game.scale.lockOrientation(Phaser.Scale.LANDSCAPE); } catch (error) {}
              // eslint-disable-next-line no-empty
              try { ScreenOrientation.lock('landscape'); } catch (error) {}
              // eslint-disable-next-line no-empty
              try { window.screen.orientation.lock('landscape'); } catch (error) {}
            });

            // On click
            this.input.on('pointerdown', () => {
              // Attempt fullscreen
              this.game.scale.startFullscreen();
            });
          }
        },
      },
    });
  }
}

export default EnnaBirthday;
