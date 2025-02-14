import React from 'react';

import { add, format, isEqual, isToday, } from 'date-fns';

import {
    classNames,
    defaultColors,
    fontWeight,
    getColorTheme,
    getColorVariantsFromColorThemeValue
} from 'lib';
import { Color } from '../../../lib';
import { borderRadius } from 'lib/shape';

export const relativeFilterOptions = [
    {
        value: 'w',
        name: 'Last 7 days',
    },
    {
        value: 't',
        name: 'Last 30 days',
    },
    {
        value: 'm',
        name: 'Month to Date',
    },
    {
        value: 'y',
        name: 'Year to Date',
    },
];

export const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
];


export const previousMonth = (
    firstDayCurrentMonth: Date,
    setCurrentMonth: React.Dispatch<React.SetStateAction<string>>) => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
};

export const nextMonth = (
    firstDayCurrentMonth: Date,
    setCurrentMonth: React.Dispatch<React.SetStateAction<string>>
) => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
};

export const displaySelected = (selectedStartDay: Date|null, selectedEndDay: Date|null) => {
    if (!selectedStartDay && !selectedEndDay) {
        return '';
    } else if (selectedStartDay && !selectedEndDay) {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return selectedStartDay.toLocaleDateString('en-US', options);
    } else if (selectedStartDay && selectedEndDay) {
        if ((selectedStartDay.getMonth() === selectedEndDay.getMonth())
            && (selectedStartDay.getFullYear() === selectedEndDay.getFullYear())) {
            const optionsStartDate: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
            return `${selectedStartDay.toLocaleDateString('en-US', optionsStartDate)} - 
                    ${selectedEndDay.getDate()}, ${selectedEndDay.getFullYear()}`;
        } else {
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
            return `${selectedStartDay.toLocaleDateString('en-US', options)} - 
                    ${selectedEndDay.toLocaleDateString('en-US', options)}`;
        }
    }
};

export const getDayBgColorClassName = (
    day: Date,
    selectedStartDay: Date|null,
    selectedEndDay: Date|null,
    hoveredDay: Date|null,
    color: Color,
    isDayDisabled = false,
): string => {
    if (isDayDisabled) return getColorVariantsFromColorThemeValue(defaultColors.transparent).bgColor;
    if (selectedStartDay && isEqual(day, selectedStartDay)) {
        return getColorVariantsFromColorThemeValue(getColorTheme(color).background).bgColor;
    }
    if (selectedStartDay && !selectedEndDay && hoveredDay && (day > selectedStartDay && day < hoveredDay)) {
        return getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor;
    }
    if (selectedEndDay && isEqual(day, selectedEndDay)) {
        return getColorVariantsFromColorThemeValue(getColorTheme(color).background).bgColor;
    }
    if (selectedStartDay && selectedEndDay && (day > selectedStartDay && day < selectedEndDay)) {
        return getColorVariantsFromColorThemeValue(defaultColors.lightBackground).bgColor;
    }
    return getColorVariantsFromColorThemeValue(defaultColors.transparent).bgColor;
    
};

export const getDayTextClassNames = (
    day: Date,
    selectedStartDay: Date|null,
    selectedEndDay: Date|null,
    hoveredDay: Date|null,
    color: Color,
    isDayDisabled = false,
): string => {
    if (isDayDisabled) return getColorVariantsFromColorThemeValue(defaultColors.lightText).textColor; 
    if (isToday(day)) {
        if ((selectedStartDay && isEqual(day, selectedStartDay))
            || (selectedEndDay && isEqual(day, selectedEndDay))) {
            return getColorVariantsFromColorThemeValue(defaultColors.white).textColor;
        }
        return classNames(
            getColorVariantsFromColorThemeValue(getColorTheme(color).text).textColor,
            fontWeight.lg,
        );
    }
    if (selectedStartDay && isEqual(day, selectedStartDay)) {
        return getColorVariantsFromColorThemeValue(defaultColors.white).textColor;
    }
    if (selectedStartDay && !selectedEndDay && hoveredDay && (day > selectedStartDay && day < hoveredDay)) {
        return getColorVariantsFromColorThemeValue(defaultColors.darkestText).textColor;
    }
    if (selectedEndDay && isEqual(day, selectedEndDay)) {
        return getColorVariantsFromColorThemeValue(defaultColors.white).textColor;
    }
    if (selectedStartDay && selectedEndDay && (day > selectedStartDay && day < selectedEndDay)) {
        return getColorVariantsFromColorThemeValue(getColorTheme(color).text).textColor;
    }
    return getColorVariantsFromColorThemeValue(defaultColors.darkestText).textColor;
};

export const getDayHoverBgColorClassName = (
    day: Date,
    selectedStartDay: Date|null,
    selectedEndDay: Date|null,
    isDayDisabled = false,
): string => {
    if (isDayDisabled) return '';
    if (selectedStartDay && isEqual(day, selectedStartDay)) {
        return '';
    }
    if (selectedEndDay && isEqual(day, selectedEndDay)) {
        return '';
    }
    return 'hover:tr-bg-gray-200';
};

export const getDayRoundedClassName = (
    day: Date,
    selectedStartDay: Date|null,
    selectedEndDay: Date|null,
    hoveredDay: Date|null
): string => {
    if (!selectedStartDay && !selectedEndDay) {
        return borderRadius.md.all;
    }
    if (selectedStartDay && selectedEndDay && isEqual(day, selectedStartDay)) {
        return borderRadius.md.left;
    }
    if (selectedStartDay && !selectedEndDay && !hoveredDay && isEqual(day, selectedStartDay)) {
        return borderRadius.md.all;
    }
    if (selectedStartDay && !selectedEndDay && hoveredDay && (day < selectedStartDay)) {
        return borderRadius.md.all;
    }
    if (selectedStartDay && !selectedEndDay && hoveredDay && (isEqual(day, selectedStartDay))
        && (hoveredDay > selectedStartDay)) {
        return borderRadius.md.left;
    }
    if (selectedStartDay && !selectedEndDay && hoveredDay && (day > selectedStartDay && day < hoveredDay)) {
        return borderRadius.none.all;
    }
    if (selectedStartDay && selectedEndDay && (day > selectedStartDay && day < selectedEndDay)) {
        return borderRadius.none.all;
    }
    if (selectedStartDay && !selectedEndDay && hoveredDay && isEqual(day, hoveredDay)
        && !isEqual(day, selectedStartDay)) {
        return borderRadius.md.right;
    }
    if (selectedStartDay && selectedEndDay && isEqual(day, selectedEndDay)) {
        return borderRadius.md.right;
    }
    if (selectedStartDay && selectedEndDay && (day < selectedStartDay || day > selectedEndDay)) {
        return borderRadius.md.all;
    }
    return borderRadius.md.all;
};
