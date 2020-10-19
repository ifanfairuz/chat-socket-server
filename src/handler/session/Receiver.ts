import BaseEventHandler from '../../parents/BaseEventHandler'

export default class SessionReceiver {

  protected parent: BaseEventHandler

  constructor(parent: BaseEventHandler) {
    this.parent = parent
  }

}