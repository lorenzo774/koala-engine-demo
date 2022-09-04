import { Component } from "koala-engine-core/component.js";
import { Keyboard } from "koala-engine-core/input/keyboard-input.js";
import { Key } from "koala-engine-core/input/key.js";
import { AnimatedSpriteRenderer } from "koala-engine-core/components/sprite/animated-sprite-renderer.js";
import { RigidBody } from "koala-engine-core/components/bodies/rigidbody.js";
import { AudioManager } from "koala-engine-core/audio/audio-manager.js";

export class PlayerMovement extends Component {
    private speed: number = 500;
    private jumpingSpeed: number = 500;

    private animationRenderer: AnimatedSpriteRenderer;
    private rigidBody: RigidBody;

    /*
        "STATES"
    */

    private jump() {
        this.rigidBody.velocity.y = -this.jumpingSpeed;
        this.animationRenderer.play("jump");
        AudioManager.play("jump");
        AudioManager.pause("walk");
    }

    private walk() {
        this.animationRenderer.play("run");
        AudioManager.play("walk");
    }

    private idle() {
        this.animationRenderer.play("idle");
        AudioManager.pause("walk");
    }

    private falling() {
        AudioManager.pause("idle");
        AudioManager.pause("walk");
    }

    public start() {
        this.animationRenderer =
            this.entity.getComponent<AnimatedSpriteRenderer>(
                AnimatedSpriteRenderer
            );
        this.rigidBody = this.entity.getComponent<RigidBody>(RigidBody);
    }

    public update() {
        this.rigidBody.velocity.x = 0;

        if (Keyboard.isPressed(Key.D)) {
            this.rigidBody.velocity.x = this.speed;
            this.animationRenderer.flipH = true;
        }
        if (Keyboard.isPressed(Key.A)) {
            this.rigidBody.velocity.x = this.speed * -1;
            this.animationRenderer.flipH = false;
        }
    }

    public physicsUpdate() {
        // "States conditions"
        if (
            this.rigidBody.velocity.x === 0 &&
            this.rigidBody.velocity.y === 0 &&
            this.rigidBody.onGround
        ) {
            this.idle();
        }
        if (this.rigidBody.velocity.x !== 0 && this.rigidBody.onGround) {
            this.walk();
        }
        if (this.rigidBody.velocity.x !== 0 && !this.rigidBody.onGround) {
            this.falling();
        }
        if (Keyboard.justPressed(Key.SPACE) && this.rigidBody.onGround) {
            this.jump();
        }
    }
}
