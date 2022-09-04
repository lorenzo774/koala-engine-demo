import { Animation } from "koala-engine-core/components/sprite/animation.js";
import { AnimatedSpriteRenderer } from "koala-engine-core/components/sprite/animated-sprite-renderer.js";
import { Entity } from "koala-engine-core/entity.js";
import { ImageRect } from "koala-engine-core/components/sprite/image-rect.js";
import { SpriteSheet } from "koala-engine-core/components/sprite/sprite-sheet.js";
import { Vector2 } from "koala-engine-core/math/vector2.js";
import { Settings } from "koala-engine-core/settings/settings.js";
import { loadImage } from "koala-engine-core/utils/helper.js";
import { PlayerMovement } from "./player-movement.js";
import { Transform } from "koala-engine-core/components/transform.js";
import { RigidBody } from "koala-engine-core/components/bodies/rigidbody.js";
import { Camera } from "koala-engine-core/components/camera.js";
import { Rect } from "koala-engine-core/utils/rect.js";
import { PlayerCollision } from "./player-collision.js";

export class Player extends Entity {
    constructor() {
        super("player");
    }

    protected init() {
        const [width, height] = [
            Settings.main.TILE_SCALED * 1.9,
            Settings.main.TILE_SCALED * 2.3,
        ];
        const camera = new Camera(
            this,
            this.getComponent<Transform>(Transform),
            new Vector2(0, 500)
        );
        this.components = [
            camera,
            new AnimatedSpriteRenderer(
                this,
                new ImageRect(Vector2.ZERO, new Vector2(19, 23)),
                new Vector2(width, height),
                Vector2.ZERO,
                this.loadAnimations()
            ),
            new PlayerMovement(this),
            new RigidBody(
                this,
                new Rect(new Vector2(0, 50), new Vector2(width, height - 50))
            ),
            new PlayerCollision(this),
        ];
        Camera.main = camera;
    }

    private loadAnimations(): Animation[] {
        return [
            new Animation(
                new SpriteSheet(
                    loadImage("../assets/Player/Shroom-Sheet-Idle.png"),
                    2
                ),
                "idle",
                3,
                true
            ),
            new Animation(
                new SpriteSheet(
                    loadImage("../assets/Player/Shroom-Sheet-Run.png"),
                    4
                ),
                "run",
                3,
                true
            ),
            new Animation(
                new SpriteSheet(
                    loadImage("../assets/Player/Shroom-Sheet-Jump.png"),
                    9
                ),
                "jump",
                2
            ),
        ];
    }

    public start() {
        this.getComponent<Transform>(Transform).position = new Vector2(700, 0);
    }
}
