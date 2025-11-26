/**
 * SEKIGAHARA RTS - Map System (Enhanced)
 * マップ生成と描画（高精細化、等高線、グラデーション）
 */

import { MAP_W, MAP_H } from './constants.js';

export class MapSystem {
    constructor() {
        this.map = [];
    }

    generateMap() {
        this.map = [];
        for (let r = 0; r < MAP_H; r++) {
            let row = [];
            for (let q = 0; q < MAP_W; q++) {
                let h = 0;
                let type = 'PLAIN';

                // 松尾山エリア
                if (Math.hypot(q - 5, r - 50) < 8) {
                    h = 4 + Math.random() * 5;
                }
                // 南宮山エリア
                else if (Math.hypot(q - 50, r - 50) < 8) {
                    h = 4 + Math.random() * 5;
                }
                // 伊吹山エリア
                else if (q < 10 && r < 20) {
                    h = 6 + Math.random() * 4;
                }

                if (h > 4) type = 'MTN';
                if (Math.abs(q - r) < 2 && h < 3) {
                    type = 'RIVER';
                    h = -1;
                }

                row.push({ q, r, h, type });
            }
            this.map.push(row);
        }
        return this.map;
    }

    getMap() {
        return this.map;
    }

    getTile(q, r) {
        if (q < 0 || q >= MAP_W || r < 0 || r >= MAP_H) return null;
        return this.map[r][q];
    }
}
