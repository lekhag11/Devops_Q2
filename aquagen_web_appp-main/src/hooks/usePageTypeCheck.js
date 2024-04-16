import { useParams } from 'react-router-dom';

/**
 * Custom hook to check the pageType from URL
 * @param {*any} setValue
 * @param {*string} categoryType
 * @returns {*object}
 */

export default function usePageTypeCheck(categoryType) {
    const { categoryId } = useParams();

    const object = {
        check: categoryId?.toLowerCase() === categoryType,
    };

    return object;
}
