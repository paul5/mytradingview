'use client';
import * as React from 'react';
import { useStockPrice } from '../lib/socket';
import { SearchTickerItem } from '@/lib/types';
import { numberFormatter, positiveNegativeNumberFormatter } from '@/lib/formatters';
import { ListItemText } from '@mui/material';
import { green, red } from "@mui/material/colors";

const [primaryTextSize, secondaryTextSize] = ['1em', '0.85em'];

interface ITickerProps {
    item: SearchTickerItem
}

export const StockTickerView = (props: ITickerProps) => {
    const oddata = useStockPrice(props.item);
    if (oddata && oddata.quoteSummary) {
        const { quoteSummary } = oddata;
        const [price, change, changePercent] = (quoteSummary.hasPrePostMarketData && ['POST', 'POSTPOST', 'PRE'].includes(quoteSummary.marketState) && (quoteSummary.postMarketPrice || quoteSummary.preMarketPrice)) ?
            [quoteSummary.postMarketPrice || quoteSummary.preMarketPrice, quoteSummary.postMarketChange || quoteSummary.preMarketChange, quoteSummary.postMarketChangePercent || quoteSummary.preMarketChangePercent]
            : [quoteSummary.regularMarketPrice, quoteSummary.regularMarketChange, quoteSummary.regularMarketChangePercent];

        const secondaryColor = changePercent < 0 ? red[500] : green[500];
        const secondaryText = `${positiveNegativeNumberFormatter(change)} ${positiveNegativeNumberFormatter(changePercent)}%`
        return <ListItemText
            slotProps={{
                primary: {
                    fontSize: primaryTextSize
                },
                secondary: {
                    fontSize: secondaryTextSize,
                    color: secondaryColor
                }
            }}
            primary={numberFormatter(price)}
            secondary={secondaryText}
        />
    }

    return <div></div>;
}

export const StockTickerSymbolView = (props: ITickerProps) => {
    const { name, symbol } = props.item;
    return <ListItemText
        slotProps={{
            primary: {
                fontSize: primaryTextSize
            },
            secondary: {
                fontSize: secondaryTextSize,
            }
        }}
        primary={symbol}
        secondary={name}
    />
}