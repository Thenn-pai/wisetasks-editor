import { BaseExecutor } from './BaseExecutor.js';

/**
 * Адаптер для BaseExecutor с пустыми методами.
 *
 */
export class BaseExecutorAdapter extends BaseExecutor {
    postExecute(field, event) {}
    preExecute(field, event) {}
    updateParameters(field, event) {}
}