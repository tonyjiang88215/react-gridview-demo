/**
 * Created by TonyJiang on 16/11/8.
 */
import * as React from 'react';
import {GridView, Sheet} from './gridview';
import {OBJECT_TYPE} from './gridview/model/sheet/object-type';
import {ColumnHeader} from "./gridview/model/sheet/column-header";
import {ColumnHeaderItem} from "./gridview/model/sheet/column-header-item";
import {Operation} from "./gridview/model/operation/index";
import {SelectInfo} from "./gridview/model/lib/select/item";
import {Point} from "./gridview/model/common/point";
import {CellRange} from "./gridview/model/common/cell-range";
import {BORDER_POSITION, TEXT_ALIGN, VERTICAL_ALIGN} from "./gridview/model/common/index";
import {Cell} from "./gridview/model/sheet/cell";


const borderImages = [
    {
        key: 'ALL',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACXwAAAl8BvoUoWgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAChSURBVDiN7ZXRCkEBEETPCCXKG7d59TV+z4fcP/LmA4iILuOBPMmlUHLneXZmd9ttZPsItPgcTm1AkpZJ5nXsJD1JI2ANjCUdHtVJmiQZYruyXT7TUlEUU9uxPXuGb7u0XX1yTTc0Jn9qItsVl7tPHTlJR9IA2APbWnFpl2T8lUmaZ2xMftxEtk+SVi+G1g7oAouH4tfQku0N0H9Pz3exPQMZDD7b3Y3jfQAAAABJRU5ErkJggg=='
    },
    {
        key: 'INNER_ALL',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACXwAAAl8BvoUoWgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHASURBVDiN7ZMxaFNRGEbPfbn1pQSHamLgRUkUQiZByCJ0C07dRByEOpTOQsXFioTvBaKblO4qiCgdBCddnIPgoOASiFMkQUTUyQbzyO/gcyskwQginumey/fd/8LlOknvgOeSrrTb7eJ4PO4AdyXdknQGeAK0Jd1rNBoPut3u5Uql8rTT6ZyP43jDzG4CFyS9kXQD2ARWJX2QtAusBcAKkOMnv3w5dQ+sOOdCDsDMwjTv063l1IPUc6nPThRFm1EUWRRF1+fpBdMjv4+P4/iimb2X9HLRh0s665w7EZjZHnB10QNStsxszzvntoHun5jgnHsMvJ6r9Fc/vKvVat+TJNkfjUafpoXN7DBQAD47575Oy2ez2aP5fN67UqlkZraICx9IoVDAZzKZI7MWkiRZB3aBlvd+Z5bOYDBIfL/f/zLrkCiKvqXL/Xl6/z/jTPx7n9FLegW8kLQt6RjwDHgoaafVap2eTCb3gTuSHlWr1dVer0e5XK4Ph0PiOL5kZteCINhoNptvJW0B68CapI+SbgPnAqAOnALw3i+lfhxgMpnkgLpzrggQhuFSGIZ47z2AmRWBepoj7dWBQ6mfBOo/APH1t3W4TFAVAAAAAElFTkSuQmCC',

    },
    {
        key: 'INNER_V',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACXwAAAl8BvoUoWgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGPSURBVDiN3ZUxaFNhFIW/m/dqUwpqa6iTSztk1E3B0UVcRRcnleok2LESyHnBiDiJU0HURdAOzi7dBHHTwcFBhNLFwTGQh3nJcfDvnBcIiD3bxz3//e9yOCHpO/Be0r1+v396NBp9BF5IeiTpHPAO6Et6Kek1cAN4KmmrKIqbtjvAVUlfJD0AbgMXJf2U9Ay40gBWgGX+6pCXEufASkQsJh4CE2AEYHsx+fM0X0rcSLyc+IgoJN0Bfkjam2bu9XpnbV/Osuxtp9PZn+YviuKS7Y0GsANs1rloMpmct/24qqqNOn7bm8BOHhHbwLc6j4C9iLhu+2sdc0S8AT7X3P0fKNrt9u+qqoZlWf6a9/Jms3mq1Wrl+WAwWLC9AByf9yfD4ZCyLOe99h8qiqK4ZvtA0qdp5lnDKOlCRJxp2N4FtupcNGsYgfu2d2cKY5ZlH8bj8d26/iMYxjrNGBEPu93uK0nPbd+KiCeStmdpxnVgDcB2nng1HdFMfDLxsYhokJrT9ok0b6b5auLDplwD1v8Ax/7HIBZ/9/MAAAAASUVORK5CYII=',

    },
    {
        key: 'INNER_H',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACXwAAAl8BvoUoWgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGmSURBVDiN7ZO/a1NRGIafczi3lxIodDFyqSSdAoJQuIvYLTh1E3EQutTuEnCxRpL3BqObiLt2sCgdCk6dXA2CgwVBEnATgvonGLifg0eQVDTFCkV8tvfw/eDw8ThJ74F9Sdf7/X51MpkMgEeS7kpaAfaAvqTHzWbzyXA4XK/X688Hg8Gloig2zOw2cFnSgaRbwCawKumjpIfAmgcWgQrf+J7nYw7AonMu5SeYWRrrQ3yaj9nHXIl5drIs28yyzLIsu3mUPv/7kj8nFEVxxcw+SHp13MMlnXfOnfFmtgu0jntBpGVmu8E5twUM/8YG59wz4M2Rmk724SV9Ad5JWpF0GnjJlIzOuTvdbnd7ulnSNaDNlIxJklxot9ufJB0AZz2QAAs//OyQjFG6Q0RJfyXjQpw/Oyf7Jv9lnIV/U8bXwAtJW5JOAfvAjqQHvV7vXFmW28B9SU8bjcbqaDSiVqvl4/GYoiiumtkN7/1Gp9N5K6kFrANrkj5Lugdc9EAOLAOEEJKYlwDKsqwAuXOuCpAkyVyapoQQAoCZVYE81hH7cmAu5mUg/wr5rrPvxOUzfQAAAABJRU5ErkJggg==',

    },
    {
        key: 'OUTER_ALL',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACXwAAAl8BvoUoWgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFwSURBVDiN7ZUxSgNREIb/2X3wNoikEAunkzT2OYOthZeQtKnSBAa2SWN6L5ELGPAEnkCCECRNMJhVzI7u7tiskm1igomNfs0088/Mm5/hETPnAALsjsIBICJ6MrPRuioiIjM7IaK3VToiaphZ3QEozOxmMpmcb2PsZZh5AOBsl2v6wm2SHMfxcZ7np2EYXne73ft1dRu9JM/zJoCrMq7NRk3CMLwFcFHG9WHmrDRo6zDzgJmziiciEnjv6977tN1uL0TEee/3VXUhImmv16unaXoQRdFjp9OZi0jkva+p6rOIZP1+v6aqkarORaT4rFtZl3PuSFVnSZLEABAEQVNVZ0TUAoA0TS8BjMoIImqp6iwIgiYAJEkSq+rMOXe0XLfSJMsyBTAkojsAKIpiDmAIYAwAZjYlonczm5aSMYBhmYdSNyzrVPa2c0/+j/GPHuOvGE/MXBDRfMNPy5vZIYCHb/IaZlYnZn4BsPfTaVfw+gFDOcEPed/jJAAAAABJRU5ErkJggg==',
    },
    {
        key: 'OUTER_LEFT',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACXwAAAl8BvoUoWgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIySURBVDiN3ZM9aBRRFIW/+3Z2XAzuSDIEXAiRBAQRtbAR0UoEEQQb7cQqdkEQ0bAJO3dCCiWFkEqNgtiINoKloIhgo6BgOosF/1YkmBhkN3+zcy18AbtshDS53Xn3u+++x+FIf39/Xi6Xf8zMzOxS1Rj4CEyr6jVVPQC8BFRVp1T1EXBORG4mSXJZVS8C14GTqvpGVVNgOAiC/WNjY99U9R5wxpmZARl/KwfmRaQF4JxrA/PAEoCILJpZbma/vV72/bX5RT+fe90E5qlUKr8qlcozNrHcZl6+VoFzLiyVSj2dwN6jw2EYPqlWq7Pr8WmaHjezQVcoFEpdXV19nSwRkRPA7SzLdnfCm9kQcCtot9tLzWbzS4dLXgEjhULha4f8tJm92ELGF4vFKI7jY41Gg4mJib4syz4Dk6p6VVWPAK+BS6o6labpBzPb75y7W6vVhlT1CjAJHFLVd6o6BQyHYdhbrVZnkyT5JCJ9az8xABHJgDow58+XgLqILACY2SpAnueLnl8A6s65Za9/AvWVlZU2gHNuFZAt5MkGw7hHRA6a2XNVnVuP/98wnjazx865wU74f8O43Gq1Gh0u2WgYHwLvt5DxQRDsiKJob6PRQFW7gbci8iBJknR8fHxfnudPgRuqeidN0/tmdt7rapqmF8ysBpz1YRwBhorF4tHR0dHvPpynXBzHRFG0ChCGYQEYMLMegDzPtwEDwE7/qDLgRGQ7gJlFvl/y/W4/H3jdCwz8AbZ3+WtkgmUwAAAAAElFTkSuQmCC',
    },
    {
        key: 'OUTER_TOP',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACWwAAAlsBQXivSAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIESURBVDiN7ZUxaBRRFEXP+7M76y67RhOMoKQwC0Gw0EosLAQ7wUawFoUoFoKNEAjJ3AkBsVULMZ0IoqWVFjailWBAsRAEm0hQJKtiHCezO89m09hkU0QRvN3jn8u//8PlWbvdLrIsq7BFarVaRaXRaLiZfc+y7BMQNZvNsaIovuV5vhJCiBuNxp48zztFUXyt1+ujlUqluba29iXP85U4jrfHcTycZdlyr9fLa7Xazmq1OrS6urrk7t16vb6r2Wxu26oH/HmZpHNm9iFJkscbwZImzOyguz+RtLIRn6bpcXdvB+Cmu18cKJHZSXd/EEJoD8K7+yRwq2JmM+7+fsBLngJTURQtDcjfAxYHYf8NWZqmXeBdkiT75+fn93a73dfADUmJpMPAI2BK0m1Ji8AhYEHS+TRNL7l7ChyT9ErSNWASmJD0WdJboB3cPbh7FcDMSqADZP0QXaBjZvlv4dbnn0AnhNDr+3/0/WV/joBoK37n78gknQohfJydnX2+EbzZMko6YmZjAbhbluWVgRJtsozAZXe//7+Mm5JJegM8k3RB0jDwwszuJEmSzs3NHSjL8iFwrV/GBeAscFXSTJqmZ9x9Fjgt6aWkKWCyWq0enZ6eXpZ0HTgRgH3AboA4jiNg3N1HAMqyrAHjwA4AMxsBIjNrAbj7UP98ffsN9/3r63wUGP8F+/Hp2CZbrrsAAAAASUVORK5CYII=',
    },
    {
        key: 'OUTER_RIGHT',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACXwAAAl8BvoUoWgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIvSURBVDiN3ZU/SJVhFIef8175wrhcAsNASeoOUYNFSDS1NEVLtTUEQYEUtmuX8vt9Xyi1V+ASLS1BtRdF1NYU9GdoMBQREVPJq8mXvqehr1ZvghGd7eE8h3Pg5cdrkqaBF5LOSdoJfALGJF3N8/xwjPE5cE3S3SzLHrv7GeCWpKEsywbc/QZwXNJbSTeBfmCfpLm+vr7JmZmZ3QFYAJoASZI4sGBmKwAxxvWyv8rPWnX3WKlUln4xsBBCWC95pfRjOb8GOFtZ3d3dj7q6utbClm4pq03SBWBK0tON5DzPD8UYjyZJ8qjRaHzZyK9Wq7uazaYF4DZwuZWL3P0EMFYUxe5W/Gq1WgdCG3AFmGplyMxeAkPuPt2K32w2x4Fdrbibrr/78GmauplNSNojqQeYoAxbnufHYoyvgAFJdyV9BA6Y2Z00Ta9IagAjQK+k95LGgP729vba4ODgUk9Pz8nJyclKMDM3s7Vy6RowDsyXvFry15K/A5jZt5IXy35R8hwwHkKIAO6+tUGEfzmMkvabWa+7P5O0uJG/qTCa2Sl3fwjsacX/HUYzu+7un1tc8pI/COPy8vIE/1cYJX0AXku6NDo62lEUxRszu5+m6Q1JB4EnwIike5IeAGfNLE/TNMuy7KK7N0IIp4eHh99JGgbOA0ckzXd2dh6enZ0NbcBefn65FEVRAeru3gEQQtgWY6wDO8qjakBw9+0l7wDqMcZtJXcA9SRJKgC1Wm09xug/AMgrCgdxdK38AAAAAElFTkSuQmCC',
    },
    {
        key: 'OUTER_BOTTOM',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACWwAAAlsBQXivSAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIQSURBVDiN3ZM9aFRREEbPzHt5GhWbiF0gsGAXLWzEVgQbwcrGToggGAQRlSXmzUIKIYUQLJRoLdpYW/iDYGOhYGmxEjE2wYSQmN3N3nvHIi9Bq7xYBOLXHeYMc38YMbMfwBszu2RmR4AvwKyZ3Taz48BbwMxsxsyeARdF5H5ZljfM7ApwDzhnZh/MrAWM53k+OjExMW9mT4ALCiwBq2wkAUsisgagqrGqdwFEpOPuyd1XKu5V9VD1d6r+VPGvqv6fRMzssojMl2X5cju5+qNTRVG8aDabC9v5rVbrjLs3FHjg7ldrnUjkLPAohDBSx3f3MeBhDlwTkfmaQ94Bd7Is+17Tn3X313XcvREpy9JFZM7MRqampoZDCN+AaTO7ZWangffAdTObabVan919VFUfT05OjpnZTWAaOGlmH81sBhgviuJos9lcKMtyTkSGVUQciAAiEoA2sFgdogu0RWQZwN37ACmlTuUvA21V7VX8E2ivr69HAFXtA7Ibr7U72ekyHhORE+7+yswWt/P/dRnPu/tzVW3U8beWUUTuuvvXmkN2uoxPgU913L0RaTQa/X6/H0MIayIieZ4fTin1YoxdIBsYGDgUY+ymlHp5nh9U1SLG2I0xdlS1yLJsMMa4mlKKWZbtV9V9IYQVd095nh8YGhpKKiKZiOjmVFXVTVbVTRYA2Qh/sqqqu//FWzfY4MHflG723F78BIEAAAAASUVORK5CYII=',
    },
    {
        key: 'NONE',
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAYAAAB4d5a9AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACWwAAAlsBQXivSAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAITSURBVDiN3ZM9aBRRFIW/+3YzioVKlFgFYgI2Ei1sROxEEEGw0UZEEKIIBkFEwybunAkplBTCYqFGQWxEG8HOwh9EGwUFwcZiJWK0CCYEf/I3mWvhwzYTi0A83eF8l3t5j2OSvgBPJR2RtBH4AIxIuiBpG/AMkKSGpHvAYTO7kqbpWUkngEvAPkmvJGVAb7Va7R4YGBiTdAs4GIBJ4Ad/VACTZvYLIISwEPMZADObdvfC3b9HPxvzPM5Px/ki+p8x/09kko6b2Viapo8Wg+Mf7UyS5EGtVhtfjM+ybI+7dwXgqrufKnWR2V7gep7nHWV4d+8BrlWB02Y2VnLJc6CvUql8LsmPuPuTMuzKkKVp6mY2KqljaGioPc/zT8CwpPOSdgEvgTOSGlmWvXP37hDCzXq93iPpHDAM7JD0RlID6E2SpK1Wq42naTpqZu3BzBxYADCzHGgCE/GIGaBpZlMA7j4PUBTFdOSngGYIYTb6b0Bzbm5uASCEMA/YcrzW8mipZdxiZtvd/bGkicX4fy3jAXe/H0LoKsP/LaOZXXT3jyWXLLWMd4G3ZdiVIZP0Hngh6aSkVuC1md1J0zQbHBzcWhTFQ+CypBtZlt1296PR17IsO+budeBQLGMf0NPS0rK7v7//ayzn/gBsBjYBJElSATrdfQNAURSrgE5gfTxqLRDMbA2Au6+L+eqYt8b5avRtQOdvOlf3w4ydAjMAAAAASUVORK5CYII='
    }

];



class App extends React.Component<{}, {}> {

    state = {
        operation: Operation.create(),
        sheet: Sheet.create()

    };

    onChangeOperation = (prevOperation, nextOperation) => {
        this.state.operation = nextOperation;
        return nextOperation;
    }

    onChangeSheet = (prevSheet:Sheet, nextSheet:Sheet) => {

        this.borderHandler.sheet = nextSheet;

        this.setState({
            sheet: nextSheet
        });

        return nextSheet;
    }

    onSetNewData = () => {
        const value = this.refs.input.value;
        if (value) {
            this.setState({
                sheet: Sheet.fromJS(JSON.parse(value))
            });
        }
    }

    /*
     border数据, 实例数据表示C5单元格全边框
     {
        "borders":{
            //C5单元格左边框
            "C5-1":{"weight":2,"colors":["#333"]},
            //C5单元格右边框
            "C5-0":{"weight":2,"colors":["#333"]},
            //D5单元格左边框
            "D5-1":{"weight":2,"colors":["#333"]},
            //C6单元格上边框
            "C6-0":{"weight":2,"colors":["#333"]}
        }
     }

     */
    onSetBorder = (key) => {
        const sheet = this.state.sheet;
        const operation = this.state.operation;
        const rangeItem = operation.rangeItem;

        //没有选择元素
        if (!rangeItem) {
            return;
        }

        const left = rangeItem.minColumnNo;
        const right = rangeItem.maxColumnNo;
        const top = rangeItem.minRowNo;
        const bottom = rangeItem.maxRowNo;

        switch (key) {
            case 'ALL':
                this.borderHandler.setBorderAll(left, top, right, bottom);
                break;

            case 'INNER_ALL':
                this.borderHandler.setBorderInnerAll(left, top, right, bottom);
                break;

            case 'INNER_V':
                this.borderHandler.setBorderInnerV(left, top, right, bottom);
                break;

            case 'INNER_H':
                this.borderHandler.setBorderInnerH(left, top, right, bottom);
                break;

            case 'OUTER_ALL':
                this.borderHandler.setBorderOuterAll(left, top, right, bottom);
                break;

            case 'OUTER_LEFT':
                this.borderHandler.setBorder(BORDER_POSITION.LEFT, left, top, left, bottom);
                break;

            case 'OUTER_TOP':
                this.borderHandler.setBorder(BORDER_POSITION.TOP, left, top, right, top);
                break;

            case 'OUTER_RIGHT':
                this.borderHandler.setBorder(BORDER_POSITION.RIGHT, right, top, right, bottom);
                break;

            case 'OUTER_BOTTOM':
                this.borderHandler.setBorder(BORDER_POSITION.BOTTOM, left, bottom, right, bottom);
                break;

            case 'NONE':
                this.borderHandler.removeBorderAll(left, top, right, bottom);
                break;

        }


        this.setState({
            sheet: this.borderHandler.sheet
        });

    };


    borderHandler = {

        sheet: this.state.sheet,


        //全部边框
        setBorderAll: (left:number, top:number, right:number, bottom:number) => {
            return this.borderHandler
                .setBorder(BORDER_POSITION.LEFT, left, top, right, bottom)
                .setBorder(BORDER_POSITION.TOP, left, top, right, bottom)
                .setBorder(BORDER_POSITION.RIGHT, left, top, right, bottom)
                .setBorder(BORDER_POSITION.BOTTOM, left, top, right, bottom)
        },

        //内部分割线
        setBorderInnerAll: (left:number, top:number, right:number, bottom:number) => {
            return this.borderHandler
                .setBorderAll(...arguments)
                .removeBorderOuterAll(...arguments);
        },

        //内部水平分割线
        setBorderInnerV: (left:number, top:number, right:number, bottom:number) => {
            return this.borderHandler
                .setBorder(BORDER_POSITION.TOP, left, top + 1, right, bottom);
        },

        //内部垂直分割线
        setBorderInnerH: (left:number, top:number, right:number, bottom:number) => {
            return this.borderHandler
                .setBorder(BORDER_POSITION.LEFT, left + 1, top, right, bottom);
        },

        //外边框
        setBorderOuterAll: (left:number, top:number, right:number, bottom:number) => {
            return this.borderHandler
                .setBorder(BORDER_POSITION.LEFT, left, top, left, bottom)
                .setBorder(BORDER_POSITION.TOP, left, top, right, top)
                .setBorder(BORDER_POSITION.RIGHT, right, top, right, bottom)
                .setBorder(BORDER_POSITION.BOTTOM, left, bottom, right, bottom);
        },

        removeBorderOuterAll: (left:number, top:number, right:number, bottom:number) => {
            return this.borderHandler
                .removeBorder(BORDER_POSITION.LEFT, left, top, left, bottom)
                .removeBorder(BORDER_POSITION.TOP, left, top, right, top)
                .removeBorder(BORDER_POSITION.RIGHT, right, top, right, bottom)
                .removeBorder(BORDER_POSITION.BOTTOM, left, bottom, right, bottom);
        },

        removeBorderAll: (left:number, top:number, right:number, bottom:number) => {
            return this.borderHandler
                .removeBorder(BORDER_POSITION.LEFT, left, top, right, bottom)
                .removeBorder(BORDER_POSITION.TOP, left, top, right, bottom)
                .removeBorder(BORDER_POSITION.RIGHT, left, top, right, bottom)
                .removeBorder(BORDER_POSITION.BOTTOM, left, top, right, bottom);
        },

        //设置基础方法
        setBorder: (position:BORDER_POSITION, left:number, top:number, right:number, bottom:number) => {
            this.borderHandler.sheet = this.borderHandler.sheet.editBorders(
                CellRange.create(left, top, right, bottom),
                position,
                (border) => {
                    return border.setWeight(2).setColor('#333')
                }
            );

            return this.borderHandler;
        },


        removeBorder: (position:BORDER_POSITION, left:number, top:number, right:number, bottom:number) => {
            this.borderHandler.sheet = this.borderHandler.sheet.editBorders(
                CellRange.create(left, top, right, bottom),
                position,
                () => {
                    return null
                }
            );

            return this.borderHandler;
        }


    };


    onSetTextVAlign = (textAlign:TEXT_ALIGN) => {
        const sheet = this.state.sheet;
        const operation = this.state.operation;
        const rangeItem = operation.rangeItem;

        //没有选择元素
        if (!rangeItem) {
            return;
        }

        const left = rangeItem.minColumnNo;
        const right = rangeItem.maxColumnNo;
        const top = rangeItem.minRowNo;
        const bottom = rangeItem.maxRowNo;

        const newSheet = sheet
            .editCells(
                CellRange.create(left, top, right, bottom),
                (cell, cellPoint) => {
                    return cell.setTextAlign(textAlign);
                }
            );

        this.setState({
            sheet: newSheet
        });

    };

    onSetTextHAlign = (verticalAlign:VERTICAL_ALIGN) => {
        const sheet = this.state.sheet;
        const operation = this.state.operation;
        const rangeItem = operation.rangeItem;

        //没有选择元素
        if (!rangeItem) {
            return;
        }

        const left = rangeItem.minColumnNo;
        const right = rangeItem.maxColumnNo;
        const top = rangeItem.minRowNo;
        const bottom = rangeItem.maxRowNo;

        const newSheet = sheet
            .editCells(
                CellRange.create(left, top, right, bottom),
                (cell, cellPoint) => {
                    return cell.setVerticalAlign(verticalAlign);
                }
            );

        this.setState({
            sheet: newSheet
        });
    };


    getStyles() {
        return {
            root: {
                padding: 10,
            },
            header: {
                width: '100%',
                height: '400px'
            },
            body: {
                marginTop: 10
            },
            title: {
                fontSize: 16,
                color: '#888',
                padding:'10px 0'
            },
            textArea: {
                width: '100%',
                height: 200,
                borderRadius: 2,
                resize: 'none',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                outline: 0
            },
            button: {
                marginTop: 10,
                border: '1px solid #ccc',
                background: '#f5f5f5',
                padding: '5px 10px',
                outline: 0
            },
            footer: {
                marginTop: 10,
                padding: 10,

                border: '1px solid #ccc',
                background: '#f5f5f5'
            },
            resultTextArea: {
                marginTop: 10,
                padding: 10,
                width: '100%',
                height: 200,
                borderRadius: 2,
                resize: 'none',
                border: '1px solid #ccc',
                background: '#f5f5f5',
                boxSizing: 'border-box',
                outline: 0
            },

            borderImage: {
                margin: 5
            }
        }
    }

    render():JSX.Element {


        const styles = this.getStyles();

        const borderImageIcons = borderImages.map((item) => <img style={styles.borderImage} src={item.data}
                                                                 key={item.key}
                                                                 onClick={this.onSetBorder.bind(this, item.key)}/>);

        return (
            <div style={styles.root}>
                <div style={styles.header}>
                    <GridView
                        sheet={this.state.sheet}
                        onChangeSheet={this.onChangeSheet}
                        onChangeOperation={this.onChangeOperation}
                    />
                </div>

                <div >
                    <div style={styles.title}>文本对齐</div>
                    <div>
                        <button style={styles.button} onClick={this.onSetTextVAlign.bind(this, TEXT_ALIGN.LEFT)} >文本水平左侧对齐</button>
                        <button style={styles.button} onClick={this.onSetTextVAlign.bind(this, TEXT_ALIGN.CENTER)}>文本水平居中对齐</button>
                        <button style={styles.button} onClick={this.onSetTextVAlign.bind(this, TEXT_ALIGN.RIGHT)}>文本水平右侧对齐</button>
                    </div>
                    <div>
                        <button style={styles.button} onClick={this.onSetTextHAlign.bind(this, VERTICAL_ALIGN.TOP)}>文本垂直顶部对齐</button>
                        <button style={styles.button} onClick={this.onSetTextHAlign.bind(this, VERTICAL_ALIGN.MIDDLE)}>文本垂直居中对齐</button>
                        <button style={styles.button} onClick={this.onSetTextHAlign.bind(this, VERTICAL_ALIGN.BOTTOM)}>文本垂直底部对齐</button>
                    </div>

                </div>
                <div>
                    <div style={styles.title}>边框</div>
                    {borderImageIcons}
                </div>

                <div style={styles.body}>
                    <div style={styles.title}>数据</div>
                    <textarea ref="input" style={styles.textArea}/>
                    <button style={styles.button} onClick={this.onSetNewData}>设置新数据</button>
                    <textarea
                        readOnly="true"
                        style={styles.resultTextArea}
                        value={JSON.stringify(this.state.sheet.toMinJS())}
                        onClick={(e) => {console.log(e.target.select())}}
                    />
                </div>



            </div>
        );

        /*

         <div style={{width: '100%', height: '200px'}} >
         <GridView
         ref="body"
         sheet={this.state.bodySheet}
         operation={this.state.bodyOperation}
         onChangeSheet={this.onChangeSheet.bind(this, 'bodySheet')}
         onChangeOperation={this.onChangeOperation.bind(this, 'bodyOperation')}
         />
         </div>
         <div style={{width: '100%', height: '200px'}} >
         <GridView
         ref="footer"
         sheet={this.state.footerSheet}
         operation={this.state.footerOperation}
         onChangeSheet={this.onChangeSheet.bind(this, 'footerSheet')}
         onChangeOperation={this.onChangeOperation.bind(this, 'footerOperation')}
         />
         </div>
         */
    }
}

export default App;