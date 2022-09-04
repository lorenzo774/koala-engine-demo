import { Tilemap } from "koala-engine-core/components/tilemap/tilemap.js";
import { Entity } from "koala-engine-core/entity.js";
import { Vector2 } from "koala-engine-core/math/vector2.js";
import { Tileset } from "koala-engine-core/components/tilemap/tileset.js";
import { loadImage } from "koala-engine-core/utils/helper.js";
import { Settings } from "koala-engine-core/settings/settings.js";
import { TilemapBody } from "koala-engine-core/components/bodies/tilemapbody.js";

export class World extends Entity {
    constructor() {
        super("world");
    }

    private loadTilemap(texture: HTMLImageElement) {
        this.components = [
            new Tilemap(
                this,
                new Tileset(
                    texture,
                    new Vector2(16, 16),
                    new Vector2(
                        Settings.main.TILE_SCALED,
                        Settings.main.TILE_SCALED
                    )
                ),
                Settings.main.WORLD
            ),
        ];
        const tilemap = this.getComponent<Tilemap>(Tilemap);
        this.components.push(new TilemapBody(this, true, tilemap));
        texture.removeEventListener("load", this.loadTilemap.bind(this));
    }

    protected init() {
        const img = loadImage("../assets/BGandTiles/Grass.png");
        img.addEventListener("load", this.loadTilemap.bind(this, img));
    }
}
