import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Inject, Input, NgZone, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, } from '@angular/core';
import Swiper from 'swiper/core';
import { of, Subject } from 'rxjs';
import { getParams } from './utils/get-params';
import { SwiperSlideDirective } from './swiper-slide.directive';
import { extend, isObject, setProperty, ignoreNgOnChanges, coerceBooleanProperty, isShowEl, } from './utils/utils';
import { isPlatformBrowser } from '@angular/common';
export class SwiperComponent {
    constructor(_ngZone, elementRef, _changeDetectorRef, _platformId) {
        this._ngZone = _ngZone;
        this.elementRef = elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._platformId = _platformId;
        this.slideClass = 'swiper-slide';
        this.wrapperClass = 'swiper-wrapper';
        this.showNavigation = true;
        this.showPagination = true;
        this.showScrollbar = true;
        // prettier-ignore
        this.s__beforeBreakpoint = new EventEmitter();
        // prettier-ignore
        this.s__containerClasses = new EventEmitter();
        // prettier-ignore
        this.s__slideClass = new EventEmitter();
        // prettier-ignore
        this.s__swiper = new EventEmitter();
        // prettier-ignore
        this.s_activeIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_afterInit = new EventEmitter();
        // prettier-ignore
        this.s_autoplay = new EventEmitter();
        // prettier-ignore
        this.s_autoplayStart = new EventEmitter();
        // prettier-ignore
        this.s_autoplayStop = new EventEmitter();
        // prettier-ignore
        this.s_beforeDestroy = new EventEmitter();
        // prettier-ignore
        this.s_beforeInit = new EventEmitter();
        // prettier-ignore
        this.s_beforeLoopFix = new EventEmitter();
        // prettier-ignore
        this.s_beforeResize = new EventEmitter();
        // prettier-ignore
        this.s_beforeSlideChangeStart = new EventEmitter();
        // prettier-ignore
        this.s_beforeTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_breakpoint = new EventEmitter();
        // prettier-ignore
        this.s_changeDirection = new EventEmitter();
        // prettier-ignore
        this.s_click = new EventEmitter();
        // prettier-ignore
        this.s_doubleTap = new EventEmitter();
        // prettier-ignore
        this.s_doubleClick = new EventEmitter();
        // prettier-ignore
        this.s_destroy = new EventEmitter();
        // prettier-ignore
        this.s_fromEdge = new EventEmitter();
        // prettier-ignore
        this.s_hashChange = new EventEmitter();
        // prettier-ignore
        this.s_hashSet = new EventEmitter();
        // prettier-ignore
        this.s_imagesReady = new EventEmitter();
        // prettier-ignore
        this.s_init = new EventEmitter();
        // prettier-ignore
        this.s_keyPress = new EventEmitter();
        // prettier-ignore
        this.s_lazyImageLoad = new EventEmitter();
        // prettier-ignore
        this.s_lazyImageReady = new EventEmitter();
        // prettier-ignore
        this.s_loopFix = new EventEmitter();
        // prettier-ignore
        this.s_momentumBounce = new EventEmitter();
        // prettier-ignore
        this.s_navigationHide = new EventEmitter();
        // prettier-ignore
        this.s_navigationShow = new EventEmitter();
        // prettier-ignore
        this.s_observerUpdate = new EventEmitter();
        // prettier-ignore
        this.s_orientationchange = new EventEmitter();
        // prettier-ignore
        this.s_paginationHide = new EventEmitter();
        // prettier-ignore
        this.s_paginationRender = new EventEmitter();
        // prettier-ignore
        this.s_paginationShow = new EventEmitter();
        // prettier-ignore
        this.s_paginationUpdate = new EventEmitter();
        // prettier-ignore
        this.s_progress = new EventEmitter();
        // prettier-ignore
        this.s_reachBeginning = new EventEmitter();
        // prettier-ignore
        this.s_reachEnd = new EventEmitter();
        // prettier-ignore
        this.s_realIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_resize = new EventEmitter();
        // prettier-ignore
        this.s_scroll = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragEnd = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragMove = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragStart = new EventEmitter();
        // prettier-ignore
        this.s_setTransition = new EventEmitter();
        // prettier-ignore
        this.s_setTranslate = new EventEmitter();
        // prettier-ignore
        this.s_slideChange = new EventEmitter();
        // prettier-ignore
        this.s_slideChangeTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slideChangeTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideNextTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slideNextTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slidePrevTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slidePrevTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideResetTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideResetTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_sliderMove = new EventEmitter();
        // prettier-ignore
        this.s_sliderFirstMove = new EventEmitter();
        // prettier-ignore
        this.s_slidesLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_slidesGridLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_snapGridLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_snapIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_tap = new EventEmitter();
        // prettier-ignore
        this.s_toEdge = new EventEmitter();
        // prettier-ignore
        this.s_touchEnd = new EventEmitter();
        // prettier-ignore
        this.s_touchMove = new EventEmitter();
        // prettier-ignore
        this.s_touchMoveOpposite = new EventEmitter();
        // prettier-ignore
        this.s_touchStart = new EventEmitter();
        // prettier-ignore
        this.s_transitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_transitionStart = new EventEmitter();
        // prettier-ignore
        this.s_update = new EventEmitter();
        // prettier-ignore
        this.s_zoomChange = new EventEmitter();
        // prettier-ignore
        this.s_swiper = new EventEmitter();
        this.indexChange = new EventEmitter();
        this._activeSlides = new Subject();
        this.containerClasses = 'swiper-container';
        this.slidesChanges = (val) => {
            this.slides = val.map((slide, index) => {
                slide.slideIndex = index;
                slide.classNames = this.slideClass;
                return slide;
            });
            if (this.loop && !this.loopedSlides) {
                this.calcLoopedSlides();
            }
            if (!this.virtual) {
                this.prependSlides = of(this.slides.slice(this.slides.length - this.loopedSlides));
                this.appendSlides = of(this.slides.slice(0, this.loopedSlides));
            }
            else if (this.swiperRef && this.swiperRef.virtual) {
                this._ngZone.runOutsideAngular(() => {
                    this.swiperRef.virtual.slides = this.slides;
                    this.swiperRef.virtual.update(true);
                });
            }
            this._changeDetectorRef.detectChanges();
        };
        this.style = null;
        this.updateVirtualSlides = (virtualData) => {
            // TODO: type virtualData
            if (!this.swiperRef ||
                (this.currentVirtualData &&
                    this.currentVirtualData.from === virtualData.from &&
                    this.currentVirtualData.to === virtualData.to &&
                    this.currentVirtualData.offset === virtualData.offset)) {
                return;
            }
            this.style = this.swiperRef.isHorizontal()
                ? {
                    [this.swiperRef.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`,
                }
                : {
                    top: `${virtualData.offset}px`,
                };
            this.currentVirtualData = virtualData;
            this._activeSlides.next(virtualData.slides);
            this._changeDetectorRef.detectChanges();
            this._ngZone.runOutsideAngular(() => {
                this.swiperRef.updateSlides();
                this.swiperRef.updateProgress();
                this.swiperRef.updateSlidesClasses();
                if (this.swiperRef.lazy && this.swiperRef.params.lazy['enabled']) {
                    this.swiperRef.lazy.load();
                }
                this.swiperRef.virtual.update(true);
            });
            return;
        };
    }
    set navigation(val) {
        var _a, _b, _c;
        const currentNext = typeof this._navigation !== 'boolean' ? (_a = this._navigation) === null || _a === void 0 ? void 0 : _a.nextEl : null;
        const currentPrev = typeof this._navigation !== 'boolean' ? (_b = this._navigation) === null || _b === void 0 ? void 0 : _b.prevEl : null;
        this._navigation = setProperty(val, {
            nextEl: currentNext || null,
            prevEl: currentPrev || null,
        });
        this.showNavigation = !(coerceBooleanProperty(val) !== true ||
            (this._navigation &&
                typeof this._navigation !== 'boolean' &&
                this._navigation.prevEl !== ((_c = this._prevElRef) === null || _c === void 0 ? void 0 : _c.nativeElement) &&
                (this._navigation.prevEl !== null || this._navigation.nextEl !== null) &&
                (typeof this._navigation.nextEl === 'string' ||
                    typeof this._navigation.prevEl === 'string' ||
                    typeof this._navigation.nextEl === 'object' ||
                    typeof this._navigation.prevEl === 'object')));
    }
    get navigation() {
        return this._navigation;
    }
    set pagination(val) {
        var _a;
        const current = typeof this._pagination !== 'boolean' ? (_a = this._pagination) === null || _a === void 0 ? void 0 : _a.el : null;
        this._pagination = setProperty(val, {
            el: current || null,
        });
        this.showPagination = isShowEl(val, this._pagination, this._paginationElRef);
    }
    get pagination() {
        return this._pagination;
    }
    set scrollbar(val) {
        var _a;
        const current = typeof this._scrollbar !== 'boolean' ? (_a = this._scrollbar) === null || _a === void 0 ? void 0 : _a.el : null;
        this._scrollbar = setProperty(val, {
            el: current || null,
        });
        this.showScrollbar = isShowEl(val, this._scrollbar, this._scrollbarElRef);
    }
    get scrollbar() {
        return this._scrollbar;
    }
    set virtual(val) {
        this._virtual = setProperty(val);
    }
    get virtual() {
        return this._virtual;
    }
    set index(index) {
        this.setIndex(index);
    }
    set config(val) {
        this.updateSwiper(val);
        const { params } = getParams(val);
        Object.assign(this, params);
    }
    set prevElRef(el) {
        this._prevElRef = el;
        this._setElement(el, this.navigation, 'navigation', 'prevEl');
    }
    set nextElRef(el) {
        this._nextElRef = el;
        this._setElement(el, this.navigation, 'navigation', 'nextEl');
    }
    set scrollbarElRef(el) {
        this._scrollbarElRef = el;
        this._setElement(el, this.scrollbar, 'scrollbar');
    }
    set paginationElRef(el) {
        this._paginationElRef = el;
        this._setElement(el, this.pagination, 'pagination');
    }
    get activeSlides() {
        if (this.virtual) {
            return this._activeSlides;
        }
        return of(this.slides);
    }
    get zoomContainerClass() {
        return typeof this.zoom !== 'boolean' ? this.zoom.containerClass : 'swiper-zoom-container';
    }
    _setElement(el, ref, update, key = 'el') {
        if (!el || !ref) {
            return;
        }
        if (ref && el.nativeElement) {
            if (ref[key] === el.nativeElement) {
                return;
            }
            ref[key] = el.nativeElement;
        }
        const updateObj = {};
        updateObj[update] = true;
        this.updateInitSwiper(updateObj);
    }
    ngOnInit() {
        const { params } = getParams(this);
        Object.assign(this, params);
    }
    ngAfterViewInit() {
        this.childrenSlidesInit();
        this.initSwiper();
        this._changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.s_swiper.emit(this.swiperRef);
        });
    }
    childrenSlidesInit() {
        this.slidesChanges(this.slidesEl);
        this.slidesEl.changes.subscribe(this.slidesChanges);
    }
    get isSwiperActive() {
        return this.swiperRef && !this.swiperRef.destroyed;
    }
    initSwiper() {
        const { params: swiperParams, passedParams } = getParams(this);
        Object.assign(this, swiperParams);
        this._ngZone.runOutsideAngular(() => {
            swiperParams.init = false;
            if (!swiperParams.virtual) {
                swiperParams.observer = true;
            }
            swiperParams.onAny = (event, ...args) => {
                const emitter = this[`s_${event}`];
                if (emitter) {
                    emitter.emit(...args);
                }
            };
            Object.assign(swiperParams.on, {
                _containerClasses(swiper, classes) {
                    this.containerClasses = classes;
                },
                _slideClasses: (_, updated) => {
                    updated.forEach(({ slideEl, classNames }, index) => {
                        const slideIndex = parseInt(slideEl.getAttribute('data-swiper-slide-index')) || index;
                        if (this.virtual) {
                            const virtualSlide = this.slides.find((item) => {
                                return item.virtualIndex && item.virtualIndex === slideIndex;
                            });
                            if (virtualSlide) {
                                virtualSlide.classNames = classNames;
                                return;
                            }
                        }
                        if (this.slides[slideIndex]) {
                            this.slides[slideIndex].classNames = classNames;
                        }
                    });
                    this._changeDetectorRef.detectChanges();
                },
            });
            const swiperRef = new Swiper(swiperParams);
            swiperRef.loopCreate = () => { };
            swiperRef.loopDestroy = () => { };
            if (swiperParams.loop) {
                swiperRef.loopedSlides = this.loopedSlides;
            }
            if (swiperRef.virtual && swiperRef.params.virtual.enabled) {
                swiperRef.virtual.slides = this.slides;
                const extendWith = {
                    cache: false,
                    renderExternal: this.updateVirtualSlides,
                    renderExternalUpdate: false,
                };
                extend(swiperRef.params.virtual, extendWith);
                extend(swiperRef.originalParams.virtual, extendWith);
            }
            if (isPlatformBrowser(this._platformId)) {
                this.swiperRef = swiperRef.init(this.elementRef.nativeElement);
                if (this.swiperRef.virtual && this.swiperRef.params.virtual.enabled) {
                    this.swiperRef.virtual.update(true);
                }
                this._changeDetectorRef.detectChanges();
                swiperRef.on('slideChange', () => {
                    this.indexChange.emit(this.swiperRef.realIndex);
                });
            }
        });
    }
    ngOnChanges(changedParams) {
        this.updateSwiper(changedParams);
        this._changeDetectorRef.detectChanges();
    }
    updateInitSwiper(changedParams) {
        if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        this._ngZone.runOutsideAngular(() => {
            const { params: currentParams, pagination, navigation, scrollbar, virtual, thumbs, } = this.swiperRef;
            if (changedParams.pagination) {
                if (this.pagination &&
                    typeof this.pagination !== 'boolean' &&
                    this.pagination.el &&
                    pagination &&
                    !pagination.el) {
                    this.updateParameter('pagination', this.pagination);
                    pagination.init();
                    pagination.render();
                    pagination.update();
                }
                else {
                    pagination.destroy();
                    pagination.el = null;
                }
            }
            if (changedParams.scrollbar) {
                if (this.scrollbar &&
                    typeof this.scrollbar !== 'boolean' &&
                    this.scrollbar.el &&
                    scrollbar &&
                    !scrollbar.el) {
                    this.updateParameter('scrollbar', this.scrollbar);
                    scrollbar.init();
                    scrollbar.updateSize();
                    scrollbar.setTranslate();
                }
                else {
                    scrollbar.destroy();
                    scrollbar.el = null;
                }
            }
            if (changedParams.navigation) {
                if (this.navigation &&
                    typeof this.navigation !== 'boolean' &&
                    this.navigation.prevEl &&
                    this.navigation.nextEl &&
                    navigation &&
                    !navigation.prevEl &&
                    !navigation.nextEl) {
                    this.updateParameter('navigation', this.navigation);
                    navigation.init();
                    navigation.update();
                }
                else if (navigation.prevEl && navigation.nextEl) {
                    navigation.destroy();
                    navigation.nextEl = null;
                    navigation.prevEl = null;
                }
            }
            if (changedParams.thumbs && this.thumbs && this.thumbs.swiper) {
                this.updateParameter('thumbs', this.thumbs);
                const initialized = thumbs.init();
                if (initialized)
                    thumbs.update(true);
            }
            if (changedParams.controller && this.controller && this.controller.control) {
                this.swiperRef.controller.control = this.controller.control;
            }
            this.swiperRef.update();
        });
    }
    updateSwiper(changedParams) {
        this._ngZone.runOutsideAngular(() => {
            var _a, _b;
            if (changedParams.config) {
                return;
            }
            if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
                return;
            }
            for (const key in changedParams) {
                if (ignoreNgOnChanges.indexOf(key) >= 0) {
                    continue;
                }
                const newValue = (_b = (_a = changedParams[key]) === null || _a === void 0 ? void 0 : _a.currentValue) !== null && _b !== void 0 ? _b : changedParams[key];
                this.updateParameter(key, newValue);
            }
            if (changedParams.allowSlideNext) {
                this.swiperRef.allowSlideNext = this.allowSlideNext;
            }
            if (changedParams.allowSlidePrev) {
                this.swiperRef.allowSlidePrev = this.allowSlidePrev;
            }
            if (changedParams.direction) {
                this.swiperRef.changeDirection(this.direction, false);
            }
            if (changedParams.breakpoints) {
                if (this.loop && !this.loopedSlides) {
                    this.calcLoopedSlides();
                }
                this.swiperRef.currentBreakpoint = null;
                this.swiperRef.setBreakpoint();
            }
            if (changedParams.thumbs || changedParams.controller) {
                this.updateInitSwiper(changedParams);
            }
            this.swiperRef.update();
        });
    }
    calcLoopedSlides() {
        if (!this.loop) {
            return;
        }
        let slidesPerViewParams = this.slidesPerView;
        if (this.breakpoints) {
            const breakpoint = Swiper.prototype.getBreakpoint(this.breakpoints);
            const breakpointOnlyParams = breakpoint in this.breakpoints ? this.breakpoints[breakpoint] : undefined;
            if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
                slidesPerViewParams = breakpointOnlyParams.slidesPerView;
            }
        }
        if (slidesPerViewParams === 'auto') {
            this.loopedSlides = this.slides.length;
            return this.slides.length;
        }
        let loopedSlides = this.loopedSlides || slidesPerViewParams;
        loopedSlides += this.loopAdditionalSlides;
        if (loopedSlides > this.slides.length) {
            loopedSlides = this.slides.length;
        }
        this.loopedSlides = loopedSlides;
        return loopedSlides;
    }
    updateParameter(key, value) {
        if (!(this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        const _key = key.replace(/^_/, '');
        const isCurrentParamObj = isObject(this.swiperRef.params[_key]);
        if (Object.keys(this.swiperRef.modules).indexOf(_key) >= 0) {
            const defaultParams = this.swiperRef.modules[_key].params[_key];
            if (isCurrentParamObj) {
                extend(this.swiperRef.params[_key], defaultParams);
            }
            else {
                this.swiperRef.params[_key] = defaultParams;
            }
        }
        if (isCurrentParamObj && isObject(value)) {
            extend(this.swiperRef.params[_key], value);
        }
        else {
            this.swiperRef.params[_key] = value;
        }
    }
    setIndex(index, speed, silent) {
        if (!this.isSwiperActive) {
            this.initialSlide = index;
            return;
        }
        if (index === this.swiperRef.activeIndex) {
            return;
        }
        this._ngZone.runOutsideAngular(() => {
            if (this.loop) {
                this.swiperRef.slideToLoop(index, speed, !silent);
            }
            else {
                this.swiperRef.slideTo(index, speed, !silent);
            }
        });
    }
    ngOnDestroy() {
        this._ngZone.runOutsideAngular(() => {
            var _a;
            (_a = this.swiperRef) === null || _a === void 0 ? void 0 : _a.destroy(true, false);
        });
    }
}
SwiperComponent.decorators = [
    { type: Component, args: [{
                selector: 'swiper, [swiper]',
                template: "<ng-content select=\"[slot=container-start]\"></ng-content>\n<ng-container *ngIf=\"navigation && showNavigation\">\n  <div class=\"swiper-button-prev\" #prevElRef></div>\n  <div class=\"swiper-button-next\" #nextElRef></div>\n</ng-container>\n<div *ngIf=\"scrollbar && showScrollbar\" class=\"swiper-scrollbar\" #scrollbarElRef></div>\n<div *ngIf=\"pagination && showPagination\" class=\"swiper-pagination\" #paginationElRef></div>\n<div [ngClass]=\"[wrapperClass, class].join(' ')\" [attr.id]=\"id\">\n  <ng-content select=\"[slot=wrapper-start]\"></ng-content>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: prependSlides,\n        key: 'prepend'\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: activeSlides,\n        key: ''\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: appendSlides,\n        key: 'append'\n      }\n    \"\n  ></ng-template>\n  <ng-content select=\"[slot=wrapper-end]\"></ng-content>\n</div>\n<ng-content select=\"[slot=container-end]\"></ng-content>\n\n<ng-template #slidesTemplate let-loopSlides=\"loopSlides\" let-slideKey=\"key\">\n  <div\n    *ngFor=\"let slide of loopSlides | async\"\n    [ngClass]=\"\n      (slide.class ? slide.class + ' ' : '') +\n      slideClass +\n      (slideKey !== '' ? ' ' + slideDuplicateClass : '')\n    \"\n    [attr.data-swiper-slide-index]=\"slide.virtualIndex ? slide.virtualIndex : slide.slideIndex\"\n    [style]=\"style\"\n    [ngSwitch]=\"slide.zoom\"\n  >\n    <div *ngSwitchCase=\"true\" [ngClass]=\"zoomContainerClass\">\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </div>\n    <ng-container *ngSwitchDefault>\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </ng-container>\n  </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [`
      swiper {
        display: block;
      }
    `]
            },] }
];
SwiperComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
SwiperComponent.propDecorators = {
    direction: [{ type: Input }],
    touchEventsTarget: [{ type: Input }],
    initialSlide: [{ type: Input }],
    speed: [{ type: Input }],
    cssMode: [{ type: Input }],
    updateOnWindowResize: [{ type: Input }],
    resizeObserver: [{ type: Input }],
    nested: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    preventInteractionOnTransition: [{ type: Input }],
    userAgent: [{ type: Input }],
    url: [{ type: Input }],
    edgeSwipeDetection: [{ type: Input }],
    edgeSwipeThreshold: [{ type: Input }],
    freeMode: [{ type: Input }],
    freeModeMomentum: [{ type: Input }],
    freeModeMomentumRatio: [{ type: Input }],
    freeModeMomentumBounce: [{ type: Input }],
    freeModeMomentumBounceRatio: [{ type: Input }],
    freeModeMomentumVelocityRatio: [{ type: Input }],
    freeModeSticky: [{ type: Input }],
    freeModeMinimumVelocity: [{ type: Input }],
    autoHeight: [{ type: Input }],
    setWrapperSize: [{ type: Input }],
    virtualTranslate: [{ type: Input }],
    effect: [{ type: Input }],
    breakpoints: [{ type: Input }],
    spaceBetween: [{ type: Input }],
    slidesPerView: [{ type: Input }],
    slidesPerColumn: [{ type: Input }],
    slidesPerColumnFill: [{ type: Input }],
    slidesPerGroup: [{ type: Input }],
    slidesPerGroupSkip: [{ type: Input }],
    centeredSlides: [{ type: Input }],
    centeredSlidesBounds: [{ type: Input }],
    slidesOffsetBefore: [{ type: Input }],
    slidesOffsetAfter: [{ type: Input }],
    normalizeSlideIndex: [{ type: Input }],
    centerInsufficientSlides: [{ type: Input }],
    watchOverflow: [{ type: Input }],
    roundLengths: [{ type: Input }],
    touchRatio: [{ type: Input }],
    touchAngle: [{ type: Input }],
    simulateTouch: [{ type: Input }],
    shortSwipes: [{ type: Input }],
    longSwipes: [{ type: Input }],
    longSwipesRatio: [{ type: Input }],
    longSwipesMs: [{ type: Input }],
    followFinger: [{ type: Input }],
    allowTouchMove: [{ type: Input }],
    threshold: [{ type: Input }],
    touchMoveStopPropagation: [{ type: Input }],
    touchStartPreventDefault: [{ type: Input }],
    touchStartForcePreventDefault: [{ type: Input }],
    touchReleaseOnEdges: [{ type: Input }],
    uniqueNavElements: [{ type: Input }],
    resistance: [{ type: Input }],
    resistanceRatio: [{ type: Input }],
    watchSlidesProgress: [{ type: Input }],
    watchSlidesVisibility: [{ type: Input }],
    grabCursor: [{ type: Input }],
    preventClicks: [{ type: Input }],
    preventClicksPropagation: [{ type: Input }],
    slideToClickedSlide: [{ type: Input }],
    preloadImages: [{ type: Input }],
    updateOnImagesReady: [{ type: Input }],
    loop: [{ type: Input }],
    loopAdditionalSlides: [{ type: Input }],
    loopedSlides: [{ type: Input }],
    loopFillGroupWithBlank: [{ type: Input }],
    loopPreventsSlide: [{ type: Input }],
    allowSlidePrev: [{ type: Input }],
    allowSlideNext: [{ type: Input }],
    swipeHandler: [{ type: Input }],
    noSwiping: [{ type: Input }],
    noSwipingClass: [{ type: Input }],
    noSwipingSelector: [{ type: Input }],
    passiveListeners: [{ type: Input }],
    containerModifierClass: [{ type: Input }],
    slideClass: [{ type: Input }],
    slideBlankClass: [{ type: Input }],
    slideActiveClass: [{ type: Input }],
    slideDuplicateActiveClass: [{ type: Input }],
    slideVisibleClass: [{ type: Input }],
    slideDuplicateClass: [{ type: Input }],
    slideNextClass: [{ type: Input }],
    slideDuplicateNextClass: [{ type: Input }],
    slidePrevClass: [{ type: Input }],
    slideDuplicatePrevClass: [{ type: Input }],
    wrapperClass: [{ type: Input }],
    runCallbacksOnInit: [{ type: Input }],
    observeParents: [{ type: Input }],
    observeSlideChildren: [{ type: Input }],
    a11y: [{ type: Input }],
    autoplay: [{ type: Input }],
    controller: [{ type: Input }],
    coverflowEffect: [{ type: Input }],
    cubeEffect: [{ type: Input }],
    fadeEffect: [{ type: Input }],
    flipEffect: [{ type: Input }],
    hashNavigation: [{ type: Input }],
    history: [{ type: Input }],
    keyboard: [{ type: Input }],
    lazy: [{ type: Input }],
    mousewheel: [{ type: Input }],
    parallax: [{ type: Input }],
    thumbs: [{ type: Input }],
    zoom: [{ type: Input }],
    class: [{ type: Input }],
    id: [{ type: Input }],
    navigation: [{ type: Input }],
    pagination: [{ type: Input }],
    scrollbar: [{ type: Input }],
    virtual: [{ type: Input }],
    index: [{ type: Input }],
    config: [{ type: Input }],
    s__beforeBreakpoint: [{ type: Output, args: ['_beforeBreakpoint',] }],
    s__containerClasses: [{ type: Output, args: ['_containerClasses',] }],
    s__slideClass: [{ type: Output, args: ['_slideClass',] }],
    s__swiper: [{ type: Output, args: ['_swiper',] }],
    s_activeIndexChange: [{ type: Output, args: ['activeIndexChange',] }],
    s_afterInit: [{ type: Output, args: ['afterInit',] }],
    s_autoplay: [{ type: Output, args: ['autoplay',] }],
    s_autoplayStart: [{ type: Output, args: ['autoplayStart',] }],
    s_autoplayStop: [{ type: Output, args: ['autoplayStop',] }],
    s_beforeDestroy: [{ type: Output, args: ['beforeDestroy',] }],
    s_beforeInit: [{ type: Output, args: ['beforeInit',] }],
    s_beforeLoopFix: [{ type: Output, args: ['beforeLoopFix',] }],
    s_beforeResize: [{ type: Output, args: ['beforeResize',] }],
    s_beforeSlideChangeStart: [{ type: Output, args: ['beforeSlideChangeStart',] }],
    s_beforeTransitionStart: [{ type: Output, args: ['beforeTransitionStart',] }],
    s_breakpoint: [{ type: Output, args: ['breakpoint',] }],
    s_changeDirection: [{ type: Output, args: ['changeDirection',] }],
    s_click: [{ type: Output, args: ['click',] }],
    s_doubleTap: [{ type: Output, args: ['doubleTap',] }],
    s_doubleClick: [{ type: Output, args: ['doubleClick',] }],
    s_destroy: [{ type: Output, args: ['destroy',] }],
    s_fromEdge: [{ type: Output, args: ['fromEdge',] }],
    s_hashChange: [{ type: Output, args: ['hashChange',] }],
    s_hashSet: [{ type: Output, args: ['hashSet',] }],
    s_imagesReady: [{ type: Output, args: ['imagesReady',] }],
    s_init: [{ type: Output, args: ['init',] }],
    s_keyPress: [{ type: Output, args: ['keyPress',] }],
    s_lazyImageLoad: [{ type: Output, args: ['lazyImageLoad',] }],
    s_lazyImageReady: [{ type: Output, args: ['lazyImageReady',] }],
    s_loopFix: [{ type: Output, args: ['loopFix',] }],
    s_momentumBounce: [{ type: Output, args: ['momentumBounce',] }],
    s_navigationHide: [{ type: Output, args: ['navigationHide',] }],
    s_navigationShow: [{ type: Output, args: ['navigationShow',] }],
    s_observerUpdate: [{ type: Output, args: ['observerUpdate',] }],
    s_orientationchange: [{ type: Output, args: ['orientationchange',] }],
    s_paginationHide: [{ type: Output, args: ['paginationHide',] }],
    s_paginationRender: [{ type: Output, args: ['paginationRender',] }],
    s_paginationShow: [{ type: Output, args: ['paginationShow',] }],
    s_paginationUpdate: [{ type: Output, args: ['paginationUpdate',] }],
    s_progress: [{ type: Output, args: ['progress',] }],
    s_reachBeginning: [{ type: Output, args: ['reachBeginning',] }],
    s_reachEnd: [{ type: Output, args: ['reachEnd',] }],
    s_realIndexChange: [{ type: Output, args: ['realIndexChange',] }],
    s_resize: [{ type: Output, args: ['resize',] }],
    s_scroll: [{ type: Output, args: ['scroll',] }],
    s_scrollbarDragEnd: [{ type: Output, args: ['scrollbarDragEnd',] }],
    s_scrollbarDragMove: [{ type: Output, args: ['scrollbarDragMove',] }],
    s_scrollbarDragStart: [{ type: Output, args: ['scrollbarDragStart',] }],
    s_setTransition: [{ type: Output, args: ['setTransition',] }],
    s_setTranslate: [{ type: Output, args: ['setTranslate',] }],
    s_slideChange: [{ type: Output, args: ['slideChange',] }],
    s_slideChangeTransitionEnd: [{ type: Output, args: ['slideChangeTransitionEnd',] }],
    s_slideChangeTransitionStart: [{ type: Output, args: ['slideChangeTransitionStart',] }],
    s_slideNextTransitionEnd: [{ type: Output, args: ['slideNextTransitionEnd',] }],
    s_slideNextTransitionStart: [{ type: Output, args: ['slideNextTransitionStart',] }],
    s_slidePrevTransitionEnd: [{ type: Output, args: ['slidePrevTransitionEnd',] }],
    s_slidePrevTransitionStart: [{ type: Output, args: ['slidePrevTransitionStart',] }],
    s_slideResetTransitionStart: [{ type: Output, args: ['slideResetTransitionStart',] }],
    s_slideResetTransitionEnd: [{ type: Output, args: ['slideResetTransitionEnd',] }],
    s_sliderMove: [{ type: Output, args: ['sliderMove',] }],
    s_sliderFirstMove: [{ type: Output, args: ['sliderFirstMove',] }],
    s_slidesLengthChange: [{ type: Output, args: ['slidesLengthChange',] }],
    s_slidesGridLengthChange: [{ type: Output, args: ['slidesGridLengthChange',] }],
    s_snapGridLengthChange: [{ type: Output, args: ['snapGridLengthChange',] }],
    s_snapIndexChange: [{ type: Output, args: ['snapIndexChange',] }],
    s_tap: [{ type: Output, args: ['tap',] }],
    s_toEdge: [{ type: Output, args: ['toEdge',] }],
    s_touchEnd: [{ type: Output, args: ['touchEnd',] }],
    s_touchMove: [{ type: Output, args: ['touchMove',] }],
    s_touchMoveOpposite: [{ type: Output, args: ['touchMoveOpposite',] }],
    s_touchStart: [{ type: Output, args: ['touchStart',] }],
    s_transitionEnd: [{ type: Output, args: ['transitionEnd',] }],
    s_transitionStart: [{ type: Output, args: ['transitionStart',] }],
    s_update: [{ type: Output, args: ['update',] }],
    s_zoomChange: [{ type: Output, args: ['zoomChange',] }],
    s_swiper: [{ type: Output, args: ['swiper',] }],
    indexChange: [{ type: Output }],
    prevElRef: [{ type: ViewChild, args: ['prevElRef', { static: false },] }],
    nextElRef: [{ type: ViewChild, args: ['nextElRef', { static: false },] }],
    scrollbarElRef: [{ type: ViewChild, args: ['scrollbarElRef', { static: false },] }],
    paginationElRef: [{ type: ViewChild, args: ['paginationElRef', { static: false },] }],
    slidesEl: [{ type: ContentChildren, args: [SwiperSlideDirective, { descendants: true, emitDistinctChangesOnly: true },] }],
    containerClasses: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyL3NyYy9zd2lwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBRU4sTUFBTSxFQUNOLFdBQVcsRUFHWCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUNqQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixxQkFBcUIsRUFDckIsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBU3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBY3BELE1BQU0sT0FBTyxlQUFlO0lBa1kxQixZQUNVLE9BQWUsRUFDZixVQUFzQixFQUN0QixrQkFBcUMsRUFDaEIsV0FBVztRQUhoQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ2hCLGdCQUFXLEdBQVgsV0FBVyxDQUFBO1FBclRqQyxlQUFVLEdBQWdDLGNBQWMsQ0FBQztRQVV6RCxpQkFBWSxHQUFrQyxnQkFBZ0IsQ0FBQztRQTZDeEUsbUJBQWMsR0FBWSxJQUFJ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QUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7NkJBTXhDLFNBQVMsU0FBQyxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7OEJBTTdDLFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7dUJBTTlDLGVBQWUsU0FBQyxvQkFBb0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxFQUFFOytCQXFCMUYsV0FBVyxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBTd2lwZXIgZnJvbSAnc3dpcGVyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGdldFBhcmFtcyB9IGZyb20gJy4vdXRpbHMvZ2V0LXBhcmFtcyc7XG5pbXBvcnQgeyBTd2lwZXJTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4vc3dpcGVyLXNsaWRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQge1xuICBleHRlbmQsXG4gIGlzT2JqZWN0LFxuICBzZXRQcm9wZXJ0eSxcbiAgaWdub3JlTmdPbkNoYW5nZXMsXG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgaXNTaG93RWwsXG59IGZyb20gJy4vdXRpbHMvdXRpbHMnO1xuaW1wb3J0IHtcbiAgU3dpcGVyT3B0aW9ucyxcbiAgU3dpcGVyRXZlbnRzLFxuICBOYXZpZ2F0aW9uT3B0aW9ucyxcbiAgUGFnaW5hdGlvbk9wdGlvbnMsXG4gIFNjcm9sbGJhck9wdGlvbnMsXG4gIFZpcnR1YWxPcHRpb25zLFxufSBmcm9tICdzd2lwZXIvdHlwZXMnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3dpcGVyLCBbc3dpcGVyXScsXG4gIHRlbXBsYXRlVXJsOiAnLi9zd2lwZXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgc3dpcGVyIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU3dpcGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGlyZWN0aW9uOiBTd2lwZXJPcHRpb25zWydkaXJlY3Rpb24nXTtcbiAgQElucHV0KCkgdG91Y2hFdmVudHNUYXJnZXQ6IFN3aXBlck9wdGlvbnNbJ3RvdWNoRXZlbnRzVGFyZ2V0J107XG4gIEBJbnB1dCgpIGluaXRpYWxTbGlkZTogU3dpcGVyT3B0aW9uc1snaW5pdGlhbFNsaWRlJ107XG4gIEBJbnB1dCgpIHNwZWVkOiBTd2lwZXJPcHRpb25zWydzcGVlZCddO1xuICBASW5wdXQoKSBjc3NNb2RlOiBTd2lwZXJPcHRpb25zWydjc3NNb2RlJ107XG4gIEBJbnB1dCgpIHVwZGF0ZU9uV2luZG93UmVzaXplOiBTd2lwZXJPcHRpb25zWyd1cGRhdGVPbldpbmRvd1Jlc2l6ZSddO1xuICBASW5wdXQoKSByZXNpemVPYnNlcnZlcjogU3dpcGVyT3B0aW9uc1sncmVzaXplT2JzZXJ2ZXInXTtcbiAgQElucHV0KCkgbmVzdGVkOiBTd2lwZXJPcHRpb25zWyduZXN0ZWQnXTtcbiAgQElucHV0KCkgd2lkdGg6IFN3aXBlck9wdGlvbnNbJ3dpZHRoJ107XG4gIEBJbnB1dCgpIGhlaWdodDogU3dpcGVyT3B0aW9uc1snaGVpZ2h0J107XG4gIEBJbnB1dCgpIHByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbjogU3dpcGVyT3B0aW9uc1sncHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uJ107XG4gIEBJbnB1dCgpIHVzZXJBZ2VudDogU3dpcGVyT3B0aW9uc1sndXNlckFnZW50J107XG4gIEBJbnB1dCgpIHVybDogU3dpcGVyT3B0aW9uc1sndXJsJ107XG4gIEBJbnB1dCgpIGVkZ2VTd2lwZURldGVjdGlvbjogYm9vbGVhbiB8IHN0cmluZztcbiAgQElucHV0KCkgZWRnZVN3aXBlVGhyZXNob2xkOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZyZWVNb2RlOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZSddO1xuICBASW5wdXQoKSBmcmVlTW9kZU1vbWVudHVtOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtJ107XG4gIEBJbnB1dCgpIGZyZWVNb2RlTW9tZW50dW1SYXRpbzogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVNb21lbnR1bVJhdGlvJ107XG4gIEBJbnB1dCgpIGZyZWVNb2RlTW9tZW50dW1Cb3VuY2U6IFN3aXBlck9wdGlvbnNbJ2ZyZWVNb2RlTW9tZW50dW1Cb3VuY2UnXTtcbiAgQElucHV0KCkgZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtQm91bmNlUmF0aW8nXTtcbiAgQElucHV0KCkgZnJlZU1vZGVNb21lbnR1bVZlbG9jaXR5UmF0aW86IFN3aXBlck9wdGlvbnNbJ2ZyZWVNb2RlTW9tZW50dW1WZWxvY2l0eVJhdGlvJ107XG4gIEBJbnB1dCgpIGZyZWVNb2RlU3RpY2t5OiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZVN0aWNreSddO1xuICBASW5wdXQoKSBmcmVlTW9kZU1pbmltdW1WZWxvY2l0eTogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVNaW5pbXVtVmVsb2NpdHknXTtcbiAgQElucHV0KCkgYXV0b0hlaWdodDogU3dpcGVyT3B0aW9uc1snYXV0b0hlaWdodCddO1xuICBASW5wdXQoKSBzZXRXcmFwcGVyU2l6ZTogU3dpcGVyT3B0aW9uc1snc2V0V3JhcHBlclNpemUnXTtcbiAgQElucHV0KCkgdmlydHVhbFRyYW5zbGF0ZTogU3dpcGVyT3B0aW9uc1sndmlydHVhbFRyYW5zbGF0ZSddO1xuICBASW5wdXQoKSBlZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2VmZmVjdCddO1xuICBASW5wdXQoKSBicmVha3BvaW50czogU3dpcGVyT3B0aW9uc1snYnJlYWtwb2ludHMnXTtcbiAgQElucHV0KCkgc3BhY2VCZXR3ZWVuOiBTd2lwZXJPcHRpb25zWydzcGFjZUJldHdlZW4nXTtcbiAgQElucHV0KCkgc2xpZGVzUGVyVmlldzogU3dpcGVyT3B0aW9uc1snc2xpZGVzUGVyVmlldyddO1xuICBASW5wdXQoKSBzbGlkZXNQZXJDb2x1bW46IFN3aXBlck9wdGlvbnNbJ3NsaWRlc1BlckNvbHVtbiddO1xuICBASW5wdXQoKSBzbGlkZXNQZXJDb2x1bW5GaWxsOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJDb2x1bW5GaWxsJ107XG4gIEBJbnB1dCgpIHNsaWRlc1Blckdyb3VwOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJHcm91cCddO1xuICBASW5wdXQoKSBzbGlkZXNQZXJHcm91cFNraXA6IFN3aXBlck9wdGlvbnNbJ3NsaWRlc1Blckdyb3VwU2tpcCddO1xuICBASW5wdXQoKSBjZW50ZXJlZFNsaWRlczogU3dpcGVyT3B0aW9uc1snY2VudGVyZWRTbGlkZXMnXTtcbiAgQElucHV0KCkgY2VudGVyZWRTbGlkZXNCb3VuZHM6IFN3aXBlck9wdGlvbnNbJ2NlbnRlcmVkU2xpZGVzQm91bmRzJ107XG4gIEBJbnB1dCgpIHNsaWRlc09mZnNldEJlZm9yZTogU3dpcGVyT3B0aW9uc1snc2xpZGVzT2Zmc2V0QmVmb3JlJ107XG4gIEBJbnB1dCgpIHNsaWRlc09mZnNldEFmdGVyOiBTd2lwZXJPcHRpb25zWydzbGlkZXNPZmZzZXRBZnRlciddO1xuICBASW5wdXQoKSBub3JtYWxpemVTbGlkZUluZGV4OiBTd2lwZXJPcHRpb25zWydub3JtYWxpemVTbGlkZUluZGV4J107XG4gIEBJbnB1dCgpIGNlbnRlckluc3VmZmljaWVudFNsaWRlczogU3dpcGVyT3B0aW9uc1snY2VudGVySW5zdWZmaWNpZW50U2xpZGVzJ107XG4gIEBJbnB1dCgpIHdhdGNoT3ZlcmZsb3c6IFN3aXBlck9wdGlvbnNbJ3dhdGNoT3ZlcmZsb3cnXTtcbiAgQElucHV0KCkgcm91bmRMZW5ndGhzOiBTd2lwZXJPcHRpb25zWydyb3VuZExlbmd0aHMnXTtcbiAgQElucHV0KCkgdG91Y2hSYXRpbzogU3dpcGVyT3B0aW9uc1sndG91Y2hSYXRpbyddO1xuICBASW5wdXQoKSB0b3VjaEFuZ2xlOiBTd2lwZXJPcHRpb25zWyd0b3VjaEFuZ2xlJ107XG4gIEBJbnB1dCgpIHNpbXVsYXRlVG91Y2g6IFN3aXBlck9wdGlvbnNbJ3NpbXVsYXRlVG91Y2gnXTtcbiAgQElucHV0KCkgc2hvcnRTd2lwZXM6IFN3aXBlck9wdGlvbnNbJ3Nob3J0U3dpcGVzJ107XG4gIEBJbnB1dCgpIGxvbmdTd2lwZXM6IFN3aXBlck9wdGlvbnNbJ2xvbmdTd2lwZXMnXTtcbiAgQElucHV0KCkgbG9uZ1N3aXBlc1JhdGlvOiBTd2lwZXJPcHRpb25zWydsb25nU3dpcGVzUmF0aW8nXTtcbiAgQElucHV0KCkgbG9uZ1N3aXBlc01zOiBTd2lwZXJPcHRpb25zWydsb25nU3dpcGVzTXMnXTtcbiAgQElucHV0KCkgZm9sbG93RmluZ2VyOiBTd2lwZXJPcHRpb25zWydmb2xsb3dGaW5nZXInXTtcbiAgQElucHV0KCkgYWxsb3dUb3VjaE1vdmU6IFN3aXBlck9wdGlvbnNbJ2FsbG93VG91Y2hNb3ZlJ107XG4gIEBJbnB1dCgpIHRocmVzaG9sZDogU3dpcGVyT3B0aW9uc1sndGhyZXNob2xkJ107XG4gIEBJbnB1dCgpIHRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbjogU3dpcGVyT3B0aW9uc1sndG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uJ107XG4gIEBJbnB1dCgpIHRvdWNoU3RhcnRQcmV2ZW50RGVmYXVsdDogU3dpcGVyT3B0aW9uc1sndG91Y2hTdGFydFByZXZlbnREZWZhdWx0J107XG4gIEBJbnB1dCgpIHRvdWNoU3RhcnRGb3JjZVByZXZlbnREZWZhdWx0OiBTd2lwZXJPcHRpb25zWyd0b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdCddO1xuICBASW5wdXQoKSB0b3VjaFJlbGVhc2VPbkVkZ2VzOiBTd2lwZXJPcHRpb25zWyd0b3VjaFJlbGVhc2VPbkVkZ2VzJ107XG4gIEBJbnB1dCgpIHVuaXF1ZU5hdkVsZW1lbnRzOiBTd2lwZXJPcHRpb25zWyd1bmlxdWVOYXZFbGVtZW50cyddO1xuICBASW5wdXQoKSByZXNpc3RhbmNlOiBTd2lwZXJPcHRpb25zWydyZXNpc3RhbmNlJ107XG4gIEBJbnB1dCgpIHJlc2lzdGFuY2VSYXRpbzogU3dpcGVyT3B0aW9uc1sncmVzaXN0YW5jZVJhdGlvJ107XG4gIEBJbnB1dCgpIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IFN3aXBlck9wdGlvbnNbJ3dhdGNoU2xpZGVzUHJvZ3Jlc3MnXTtcbiAgQElucHV0KCkgd2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiBTd2lwZXJPcHRpb25zWyd3YXRjaFNsaWRlc1Zpc2liaWxpdHknXTtcbiAgQElucHV0KCkgZ3JhYkN1cnNvcjogU3dpcGVyT3B0aW9uc1snZ3JhYkN1cnNvciddO1xuICBASW5wdXQoKSBwcmV2ZW50Q2xpY2tzOiBTd2lwZXJPcHRpb25zWydwcmV2ZW50Q2xpY2tzJ107XG4gIEBJbnB1dCgpIHByZXZlbnRDbGlja3NQcm9wYWdhdGlvbjogU3dpcGVyT3B0aW9uc1sncHJldmVudENsaWNrc1Byb3BhZ2F0aW9uJ107XG4gIEBJbnB1dCgpIHNsaWRlVG9DbGlja2VkU2xpZGU6IFN3aXBlck9wdGlvbnNbJ3NsaWRlVG9DbGlja2VkU2xpZGUnXTtcbiAgQElucHV0KCkgcHJlbG9hZEltYWdlczogU3dpcGVyT3B0aW9uc1sncHJlbG9hZEltYWdlcyddO1xuICBASW5wdXQoKSB1cGRhdGVPbkltYWdlc1JlYWR5OiBTd2lwZXJPcHRpb25zWyd1cGRhdGVPbkltYWdlc1JlYWR5J107XG4gIEBJbnB1dCgpIGxvb3A6IFN3aXBlck9wdGlvbnNbJ2xvb3AnXTtcbiAgQElucHV0KCkgbG9vcEFkZGl0aW9uYWxTbGlkZXM6IFN3aXBlck9wdGlvbnNbJ2xvb3BBZGRpdGlvbmFsU2xpZGVzJ107XG4gIEBJbnB1dCgpIGxvb3BlZFNsaWRlczogU3dpcGVyT3B0aW9uc1snbG9vcGVkU2xpZGVzJ107XG4gIEBJbnB1dCgpIGxvb3BGaWxsR3JvdXBXaXRoQmxhbms6IFN3aXBlck9wdGlvbnNbJ2xvb3BGaWxsR3JvdXBXaXRoQmxhbmsnXTtcbiAgQElucHV0KCkgbG9vcFByZXZlbnRzU2xpZGU6IFN3aXBlck9wdGlvbnNbJ2xvb3BQcmV2ZW50c1NsaWRlJ107XG4gIEBJbnB1dCgpIGFsbG93U2xpZGVQcmV2OiBTd2lwZXJPcHRpb25zWydhbGxvd1NsaWRlUHJldiddO1xuICBASW5wdXQoKSBhbGxvd1NsaWRlTmV4dDogU3dpcGVyT3B0aW9uc1snYWxsb3dTbGlkZU5leHQnXTtcbiAgQElucHV0KCkgc3dpcGVIYW5kbGVyOiBTd2lwZXJPcHRpb25zWydzd2lwZUhhbmRsZXInXTtcbiAgQElucHV0KCkgbm9Td2lwaW5nOiBTd2lwZXJPcHRpb25zWydub1N3aXBpbmcnXTtcbiAgQElucHV0KCkgbm9Td2lwaW5nQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ25vU3dpcGluZ0NsYXNzJ107XG4gIEBJbnB1dCgpIG5vU3dpcGluZ1NlbGVjdG9yOiBTd2lwZXJPcHRpb25zWydub1N3aXBpbmdTZWxlY3RvciddO1xuICBASW5wdXQoKSBwYXNzaXZlTGlzdGVuZXJzOiBTd2lwZXJPcHRpb25zWydwYXNzaXZlTGlzdGVuZXJzJ107XG4gIEBJbnB1dCgpIGNvbnRhaW5lck1vZGlmaWVyQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ2NvbnRhaW5lck1vZGlmaWVyQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVDbGFzcyddID0gJ3N3aXBlci1zbGlkZSc7XG4gIEBJbnB1dCgpIHNsaWRlQmxhbmtDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVCbGFua0NsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlQWN0aXZlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlQWN0aXZlQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZVZpc2libGVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVWaXNpYmxlQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVEdXBsaWNhdGVDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZU5leHRDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVOZXh0Q2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlRHVwbGljYXRlTmV4dENsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlUHJldkNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZVByZXZDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZUR1cGxpY2F0ZVByZXZDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MnXTtcbiAgQElucHV0KCkgd3JhcHBlckNsYXNzOiBTd2lwZXJPcHRpb25zWyd3cmFwcGVyQ2xhc3MnXSA9ICdzd2lwZXItd3JhcHBlcic7XG4gIEBJbnB1dCgpIHJ1bkNhbGxiYWNrc09uSW5pdDogU3dpcGVyT3B0aW9uc1sncnVuQ2FsbGJhY2tzT25Jbml0J107XG4gIEBJbnB1dCgpIG9ic2VydmVQYXJlbnRzOiBTd2lwZXJPcHRpb25zWydvYnNlcnZlUGFyZW50cyddO1xuICBASW5wdXQoKSBvYnNlcnZlU2xpZGVDaGlsZHJlbjogU3dpcGVyT3B0aW9uc1snb2JzZXJ2ZVNsaWRlQ2hpbGRyZW4nXTtcbiAgQElucHV0KCkgYTExeTogU3dpcGVyT3B0aW9uc1snYTExeSddO1xuICBASW5wdXQoKSBhdXRvcGxheTogU3dpcGVyT3B0aW9uc1snYXV0b3BsYXknXTtcbiAgQElucHV0KCkgY29udHJvbGxlcjogU3dpcGVyT3B0aW9uc1snY29udHJvbGxlciddO1xuICBASW5wdXQoKSBjb3ZlcmZsb3dFZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2NvdmVyZmxvd0VmZmVjdCddO1xuICBASW5wdXQoKSBjdWJlRWZmZWN0OiBTd2lwZXJPcHRpb25zWydjdWJlRWZmZWN0J107XG4gIEBJbnB1dCgpIGZhZGVFZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2ZhZGVFZmZlY3QnXTtcbiAgQElucHV0KCkgZmxpcEVmZmVjdDogU3dpcGVyT3B0aW9uc1snZmxpcEVmZmVjdCddO1xuICBASW5wdXQoKSBoYXNoTmF2aWdhdGlvbjogU3dpcGVyT3B0aW9uc1snaGFzaE5hdmlnYXRpb24nXTtcbiAgQElucHV0KCkgaGlzdG9yeTogU3dpcGVyT3B0aW9uc1snaGlzdG9yeSddO1xuICBASW5wdXQoKSBrZXlib2FyZDogU3dpcGVyT3B0aW9uc1sna2V5Ym9hcmQnXTtcbiAgQElucHV0KCkgbGF6eTogU3dpcGVyT3B0aW9uc1snbGF6eSddO1xuICBASW5wdXQoKSBtb3VzZXdoZWVsOiBTd2lwZXJPcHRpb25zWydtb3VzZXdoZWVsJ107XG4gIEBJbnB1dCgpIHBhcmFsbGF4OiBTd2lwZXJPcHRpb25zWydwYXJhbGxheCddO1xuICBASW5wdXQoKSB0aHVtYnM6IFN3aXBlck9wdGlvbnNbJ3RodW1icyddO1xuICBASW5wdXQoKSB6b29tOiBTd2lwZXJPcHRpb25zWyd6b29tJ107XG4gIEBJbnB1dCgpIGNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHNldCBuYXZpZ2F0aW9uKHZhbCkge1xuICAgIGNvbnN0IGN1cnJlbnROZXh0ID0gdHlwZW9mIHRoaXMuX25hdmlnYXRpb24gIT09ICdib29sZWFuJyA/IHRoaXMuX25hdmlnYXRpb24/Lm5leHRFbCA6IG51bGw7XG4gICAgY29uc3QgY3VycmVudFByZXYgPSB0eXBlb2YgdGhpcy5fbmF2aWdhdGlvbiAhPT0gJ2Jvb2xlYW4nID8gdGhpcy5fbmF2aWdhdGlvbj8ucHJldkVsIDogbnVsbDtcbiAgICB0aGlzLl9uYXZpZ2F0aW9uID0gc2V0UHJvcGVydHkodmFsLCB7XG4gICAgICBuZXh0RWw6IGN1cnJlbnROZXh0IHx8IG51bGwsXG4gICAgICBwcmV2RWw6IGN1cnJlbnRQcmV2IHx8IG51bGwsXG4gICAgfSk7XG4gICAgdGhpcy5zaG93TmF2aWdhdGlvbiA9ICEoXG4gICAgICBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKSAhPT0gdHJ1ZSB8fFxuICAgICAgKHRoaXMuX25hdmlnYXRpb24gJiZcbiAgICAgICAgdHlwZW9mIHRoaXMuX25hdmlnYXRpb24gIT09ICdib29sZWFuJyAmJlxuICAgICAgICB0aGlzLl9uYXZpZ2F0aW9uLnByZXZFbCAhPT0gdGhpcy5fcHJldkVsUmVmPy5uYXRpdmVFbGVtZW50ICYmXG4gICAgICAgICh0aGlzLl9uYXZpZ2F0aW9uLnByZXZFbCAhPT0gbnVsbCB8fCB0aGlzLl9uYXZpZ2F0aW9uLm5leHRFbCAhPT0gbnVsbCkgJiZcbiAgICAgICAgKHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uLm5leHRFbCA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgICB0eXBlb2YgdGhpcy5fbmF2aWdhdGlvbi5wcmV2RWwgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICAgdHlwZW9mIHRoaXMuX25hdmlnYXRpb24ubmV4dEVsID09PSAnb2JqZWN0JyB8fFxuICAgICAgICAgIHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uLnByZXZFbCA9PT0gJ29iamVjdCcpKVxuICAgICk7XG4gIH1cbiAgZ2V0IG5hdmlnYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hdmlnYXRpb247XG4gIH1cbiAgcHJpdmF0ZSBfbmF2aWdhdGlvbjogTmF2aWdhdGlvbk9wdGlvbnMgfCBib29sZWFuO1xuICBzaG93TmF2aWdhdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IHBhZ2luYXRpb24odmFsKSB7XG4gICAgY29uc3QgY3VycmVudCA9IHR5cGVvZiB0aGlzLl9wYWdpbmF0aW9uICE9PSAnYm9vbGVhbicgPyB0aGlzLl9wYWdpbmF0aW9uPy5lbCA6IG51bGw7XG4gICAgdGhpcy5fcGFnaW5hdGlvbiA9IHNldFByb3BlcnR5KHZhbCwge1xuICAgICAgZWw6IGN1cnJlbnQgfHwgbnVsbCxcbiAgICB9KTtcbiAgICB0aGlzLnNob3dQYWdpbmF0aW9uID0gaXNTaG93RWwodmFsLCB0aGlzLl9wYWdpbmF0aW9uLCB0aGlzLl9wYWdpbmF0aW9uRWxSZWYpO1xuICB9XG4gIGdldCBwYWdpbmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wYWdpbmF0aW9uO1xuICB9XG4gIHByaXZhdGUgX3BhZ2luYXRpb246IFBhZ2luYXRpb25PcHRpb25zIHwgYm9vbGVhbjtcbiAgc2hvd1BhZ2luYXRpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzY3JvbGxiYXIodmFsKSB7XG4gICAgY29uc3QgY3VycmVudCA9IHR5cGVvZiB0aGlzLl9zY3JvbGxiYXIgIT09ICdib29sZWFuJyA/IHRoaXMuX3Njcm9sbGJhcj8uZWwgOiBudWxsO1xuICAgIHRoaXMuX3Njcm9sbGJhciA9IHNldFByb3BlcnR5KHZhbCwge1xuICAgICAgZWw6IGN1cnJlbnQgfHwgbnVsbCxcbiAgICB9KTtcbiAgICB0aGlzLnNob3dTY3JvbGxiYXIgPSBpc1Nob3dFbCh2YWwsIHRoaXMuX3Njcm9sbGJhciwgdGhpcy5fc2Nyb2xsYmFyRWxSZWYpO1xuICB9XG4gIGdldCBzY3JvbGxiYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbGJhcjtcbiAgfVxuICBwcml2YXRlIF9zY3JvbGxiYXI6IFNjcm9sbGJhck9wdGlvbnMgfCBib29sZWFuO1xuICBzaG93U2Nyb2xsYmFyOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgdmlydHVhbCh2YWwpIHtcbiAgICB0aGlzLl92aXJ0dWFsID0gc2V0UHJvcGVydHkodmFsKTtcbiAgfVxuICBnZXQgdmlydHVhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmlydHVhbDtcbiAgfVxuICBwcml2YXRlIF92aXJ0dWFsOiBWaXJ0dWFsT3B0aW9ucyB8IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnNldEluZGV4KGluZGV4KTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY29uZmlnKHZhbDogU3dpcGVyT3B0aW9ucykge1xuICAgIHRoaXMudXBkYXRlU3dpcGVyKHZhbCk7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IGdldFBhcmFtcyh2YWwpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFyYW1zKTtcbiAgfVxuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX2JlZm9yZUJyZWFrcG9pbnQnKSBzX19iZWZvcmVCcmVha3BvaW50OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfYmVmb3JlQnJlYWtwb2ludCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX2NvbnRhaW5lckNsYXNzZXMnKSBzX19jb250YWluZXJDbGFzc2VzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfY29udGFpbmVyQ2xhc3NlcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX3NsaWRlQ2xhc3MnKSBzX19zbGlkZUNsYXNzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfc2xpZGVDbGFzcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX3N3aXBlcicpIHNfX3N3aXBlcjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snX3N3aXBlciddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYWN0aXZlSW5kZXhDaGFuZ2UnKSBzX2FjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydhY3RpdmVJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYWZ0ZXJJbml0Jykgc19hZnRlckluaXQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2FmdGVySW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYXV0b3BsYXknKSBzX2F1dG9wbGF5OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydhdXRvcGxheSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYXV0b3BsYXlTdGFydCcpIHNfYXV0b3BsYXlTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYXV0b3BsYXlTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYXV0b3BsYXlTdG9wJykgc19hdXRvcGxheVN0b3A6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2F1dG9wbGF5U3RvcCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlRGVzdHJveScpIHNfYmVmb3JlRGVzdHJveTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlRGVzdHJveSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlSW5pdCcpIHNfYmVmb3JlSW5pdDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlSW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlTG9vcEZpeCcpIHNfYmVmb3JlTG9vcEZpeDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlTG9vcEZpeCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlUmVzaXplJykgc19iZWZvcmVSZXNpemU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2JlZm9yZVJlc2l6ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlU2xpZGVDaGFuZ2VTdGFydCcpIHNfYmVmb3JlU2xpZGVDaGFuZ2VTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlU2xpZGVDaGFuZ2VTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlVHJhbnNpdGlvblN0YXJ0Jykgc19iZWZvcmVUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2JlZm9yZVRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYnJlYWtwb2ludCcpIHNfYnJlYWtwb2ludDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYnJlYWtwb2ludCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnY2hhbmdlRGlyZWN0aW9uJykgc19jaGFuZ2VEaXJlY3Rpb246IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2NoYW5nZURpcmVjdGlvbiddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnY2xpY2snKSBzX2NsaWNrOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydjbGljayddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZG91YmxlVGFwJykgc19kb3VibGVUYXA6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2RvdWJsZVRhcCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZG91YmxlQ2xpY2snKSBzX2RvdWJsZUNsaWNrOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydkb3VibGVDbGljayddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZGVzdHJveScpIHNfZGVzdHJveTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snZGVzdHJveSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZnJvbUVkZ2UnKSBzX2Zyb21FZGdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydmcm9tRWRnZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaGFzaENoYW5nZScpIHNfaGFzaENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaGFzaENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaGFzaFNldCcpIHNfaGFzaFNldDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaGFzaFNldCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaW1hZ2VzUmVhZHknKSBzX2ltYWdlc1JlYWR5OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydpbWFnZXNSZWFkeSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaW5pdCcpIHNfaW5pdDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgna2V5UHJlc3MnKSBzX2tleVByZXNzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydrZXlQcmVzcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbGF6eUltYWdlTG9hZCcpIHNfbGF6eUltYWdlTG9hZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snbGF6eUltYWdlTG9hZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbGF6eUltYWdlUmVhZHknKSBzX2xhenlJbWFnZVJlYWR5OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydsYXp5SW1hZ2VSZWFkeSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbG9vcEZpeCcpIHNfbG9vcEZpeDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snbG9vcEZpeCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbW9tZW50dW1Cb3VuY2UnKSBzX21vbWVudHVtQm91bmNlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydtb21lbnR1bUJvdW5jZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbmF2aWdhdGlvbkhpZGUnKSBzX25hdmlnYXRpb25IaWRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyduYXZpZ2F0aW9uSGlkZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbmF2aWdhdGlvblNob3cnKSBzX25hdmlnYXRpb25TaG93OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyduYXZpZ2F0aW9uU2hvdyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnb2JzZXJ2ZXJVcGRhdGUnKSBzX29ic2VydmVyVXBkYXRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydvYnNlcnZlclVwZGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnb3JpZW50YXRpb25jaGFuZ2UnKSBzX29yaWVudGF0aW9uY2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydvcmllbnRhdGlvbmNoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvbkhpZGUnKSBzX3BhZ2luYXRpb25IaWRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uSGlkZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvblJlbmRlcicpIHNfcGFnaW5hdGlvblJlbmRlcjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncGFnaW5hdGlvblJlbmRlciddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvblNob3cnKSBzX3BhZ2luYXRpb25TaG93OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uU2hvdyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvblVwZGF0ZScpIHNfcGFnaW5hdGlvblVwZGF0ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncGFnaW5hdGlvblVwZGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncHJvZ3Jlc3MnKSBzX3Byb2dyZXNzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwcm9ncmVzcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVhY2hCZWdpbm5pbmcnKSBzX3JlYWNoQmVnaW5uaW5nOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydyZWFjaEJlZ2lubmluZyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVhY2hFbmQnKSBzX3JlYWNoRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydyZWFjaEVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVhbEluZGV4Q2hhbmdlJykgc19yZWFsSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3JlYWxJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVzaXplJykgc19yZXNpemU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Jlc2l6ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsJykgc19zY3JvbGw6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Njcm9sbCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ0VuZCcpIHNfc2Nyb2xsYmFyRHJhZ0VuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2Nyb2xsYmFyRHJhZ0VuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ01vdmUnKSBzX3Njcm9sbGJhckRyYWdNb3ZlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzY3JvbGxiYXJEcmFnTW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ1N0YXJ0Jykgc19zY3JvbGxiYXJEcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Njcm9sbGJhckRyYWdTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2V0VHJhbnNpdGlvbicpIHNfc2V0VHJhbnNpdGlvbjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2V0VHJhbnNpdGlvbiddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2V0VHJhbnNsYXRlJykgc19zZXRUcmFuc2xhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NldFRyYW5zbGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2UnKSBzX3NsaWRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZUNoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kJykgc19zbGlkZUNoYW5nZVRyYW5zaXRpb25FbmQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQnKSBzX3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVOZXh0VHJhbnNpdGlvbkVuZCcpIHNfc2xpZGVOZXh0VHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVOZXh0VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVOZXh0VHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZU5leHRUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlTmV4dFRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCcpIHNfc2xpZGVQcmV2VHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVQcmV2VHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZVByZXZUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlUHJldlRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydCcpIHNfc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVSZXNldFRyYW5zaXRpb25FbmQnKSBzX3NsaWRlUmVzZXRUcmFuc2l0aW9uRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZVJlc2V0VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVyTW92ZScpIHNfc2xpZGVyTW92ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVyTW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVyRmlyc3RNb3ZlJykgc19zbGlkZXJGaXJzdE1vdmU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlckZpcnN0TW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVzTGVuZ3RoQ2hhbmdlJykgc19zbGlkZXNMZW5ndGhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlc0xlbmd0aENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVzR3JpZExlbmd0aENoYW5nZScpIHNfc2xpZGVzR3JpZExlbmd0aENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVzR3JpZExlbmd0aENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc25hcEdyaWRMZW5ndGhDaGFuZ2UnKSBzX3NuYXBHcmlkTGVuZ3RoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbmFwR3JpZExlbmd0aENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc25hcEluZGV4Q2hhbmdlJykgc19zbmFwSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NuYXBJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndGFwJykgc190YXA6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RhcCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG9FZGdlJykgc190b0VkZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RvRWRnZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hFbmQnKSBzX3RvdWNoRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0b3VjaEVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hNb3ZlJykgc190b3VjaE1vdmU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RvdWNoTW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hNb3ZlT3Bwb3NpdGUnKSBzX3RvdWNoTW92ZU9wcG9zaXRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0b3VjaE1vdmVPcHBvc2l0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hTdGFydCcpIHNfdG91Y2hTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndG91Y2hTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndHJhbnNpdGlvbkVuZCcpIHNfdHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndHJhbnNpdGlvblN0YXJ0Jykgc190cmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndXBkYXRlJykgc191cGRhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3VwZGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnem9vbUNoYW5nZScpIHNfem9vbUNoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snem9vbUNoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc3dpcGVyJykgc19zd2lwZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIGluZGV4Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgQFZpZXdDaGlsZCgncHJldkVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBwcmV2RWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9wcmV2RWxSZWYgPSBlbDtcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLm5hdmlnYXRpb24sICduYXZpZ2F0aW9uJywgJ3ByZXZFbCcpO1xuICB9XG4gIF9wcmV2RWxSZWY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ25leHRFbFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgbmV4dEVsUmVmKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fbmV4dEVsUmVmID0gZWw7XG4gICAgdGhpcy5fc2V0RWxlbWVudChlbCwgdGhpcy5uYXZpZ2F0aW9uLCAnbmF2aWdhdGlvbicsICduZXh0RWwnKTtcbiAgfVxuICBfbmV4dEVsUmVmOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzY3JvbGxiYXJFbFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgc2Nyb2xsYmFyRWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9zY3JvbGxiYXJFbFJlZiA9IGVsO1xuICAgIHRoaXMuX3NldEVsZW1lbnQoZWwsIHRoaXMuc2Nyb2xsYmFyLCAnc2Nyb2xsYmFyJyk7XG4gIH1cbiAgX3Njcm9sbGJhckVsUmVmOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdwYWdpbmF0aW9uRWxSZWYnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgc2V0IHBhZ2luYXRpb25FbFJlZihlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX3BhZ2luYXRpb25FbFJlZiA9IGVsO1xuICAgIHRoaXMuX3NldEVsZW1lbnQoZWwsIHRoaXMucGFnaW5hdGlvbiwgJ3BhZ2luYXRpb24nKTtcbiAgfVxuICBfcGFnaW5hdGlvbkVsUmVmOiBFbGVtZW50UmVmO1xuICBAQ29udGVudENoaWxkcmVuKFN3aXBlclNsaWRlRGlyZWN0aXZlLCB7IGRlc2NlbmRhbnRzOiB0cnVlLCBlbWl0RGlzdGluY3RDaGFuZ2VzT25seTogdHJ1ZSB9KVxuICBzbGlkZXNFbDogUXVlcnlMaXN0PFN3aXBlclNsaWRlRGlyZWN0aXZlPjtcbiAgcHJpdmF0ZSBzbGlkZXM6IFN3aXBlclNsaWRlRGlyZWN0aXZlW107XG5cbiAgcHJlcGVuZFNsaWRlczogT2JzZXJ2YWJsZTxTd2lwZXJTbGlkZURpcmVjdGl2ZVtdPjtcbiAgYXBwZW5kU2xpZGVzOiBPYnNlcnZhYmxlPFN3aXBlclNsaWRlRGlyZWN0aXZlW10+O1xuXG4gIHN3aXBlclJlZjogU3dpcGVyO1xuICByZWFkb25seSBfYWN0aXZlU2xpZGVzID0gbmV3IFN1YmplY3Q8U3dpcGVyU2xpZGVEaXJlY3RpdmVbXT4oKTtcblxuICBnZXQgYWN0aXZlU2xpZGVzKCkge1xuICAgIGlmICh0aGlzLnZpcnR1YWwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVTbGlkZXM7XG4gICAgfVxuICAgIHJldHVybiBvZih0aGlzLnNsaWRlcyk7XG4gIH1cblxuICBnZXQgem9vbUNvbnRhaW5lckNsYXNzKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy56b29tICE9PSAnYm9vbGVhbicgPyB0aGlzLnpvb20uY29udGFpbmVyQ2xhc3MgOiAnc3dpcGVyLXpvb20tY29udGFpbmVyJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjb250YWluZXJDbGFzc2VzID0gJ3N3aXBlci1jb250YWluZXInO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgX3BsYXRmb3JtSWQsXG4gICkge31cblxuICBwcml2YXRlIF9zZXRFbGVtZW50KGVsOiBFbGVtZW50UmVmLCByZWY6IGFueSwgdXBkYXRlOiBzdHJpbmcsIGtleSA9ICdlbCcpIHtcbiAgICBpZiAoIWVsIHx8ICFyZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHJlZiAmJiBlbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICBpZiAocmVmW2tleV0gPT09IGVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmVmW2tleV0gPSBlbC5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBjb25zdCB1cGRhdGVPYmogPSB7fTtcbiAgICB1cGRhdGVPYmpbdXBkYXRlXSA9IHRydWU7XG4gICAgdGhpcy51cGRhdGVJbml0U3dpcGVyKHVwZGF0ZU9iaik7XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IGdldFBhcmFtcyh0aGlzKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhcmFtcyk7XG4gIH1cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuY2hpbGRyZW5TbGlkZXNJbml0KCk7XG4gICAgdGhpcy5pbml0U3dpcGVyKCk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zX3N3aXBlci5lbWl0KHRoaXMuc3dpcGVyUmVmKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hpbGRyZW5TbGlkZXNJbml0KCkge1xuICAgIHRoaXMuc2xpZGVzQ2hhbmdlcyh0aGlzLnNsaWRlc0VsKTtcbiAgICB0aGlzLnNsaWRlc0VsLmNoYW5nZXMuc3Vic2NyaWJlKHRoaXMuc2xpZGVzQ2hhbmdlcyk7XG4gIH1cblxuICBwcml2YXRlIHNsaWRlc0NoYW5nZXMgPSAodmFsOiBRdWVyeUxpc3Q8U3dpcGVyU2xpZGVEaXJlY3RpdmU+KSA9PiB7XG4gICAgdGhpcy5zbGlkZXMgPSB2YWwubWFwKChzbGlkZTogU3dpcGVyU2xpZGVEaXJlY3RpdmUsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIHNsaWRlLnNsaWRlSW5kZXggPSBpbmRleDtcbiAgICAgIHNsaWRlLmNsYXNzTmFtZXMgPSB0aGlzLnNsaWRlQ2xhc3M7XG4gICAgICByZXR1cm4gc2xpZGU7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMubG9vcCAmJiAhdGhpcy5sb29wZWRTbGlkZXMpIHtcbiAgICAgIHRoaXMuY2FsY0xvb3BlZFNsaWRlcygpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMudmlydHVhbCkge1xuICAgICAgdGhpcy5wcmVwZW5kU2xpZGVzID0gb2YodGhpcy5zbGlkZXMuc2xpY2UodGhpcy5zbGlkZXMubGVuZ3RoIC0gdGhpcy5sb29wZWRTbGlkZXMpKTtcbiAgICAgIHRoaXMuYXBwZW5kU2xpZGVzID0gb2YodGhpcy5zbGlkZXMuc2xpY2UoMCwgdGhpcy5sb29wZWRTbGlkZXMpKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3dpcGVyUmVmICYmIHRoaXMuc3dpcGVyUmVmLnZpcnR1YWwpIHtcbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnZpcnR1YWwuc2xpZGVzID0gdGhpcy5zbGlkZXM7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnZpcnR1YWwudXBkYXRlKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfTtcblxuICBnZXQgaXNTd2lwZXJBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3dpcGVyUmVmICYmICF0aGlzLnN3aXBlclJlZi5kZXN0cm95ZWQ7XG4gIH1cblxuICBpbml0U3dpcGVyKCkge1xuICAgIGNvbnN0IHsgcGFyYW1zOiBzd2lwZXJQYXJhbXMsIHBhc3NlZFBhcmFtcyB9ID0gZ2V0UGFyYW1zKHRoaXMpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgc3dpcGVyUGFyYW1zKTtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc3dpcGVyUGFyYW1zLmluaXQgPSBmYWxzZTtcbiAgICAgIGlmICghc3dpcGVyUGFyYW1zLnZpcnR1YWwpIHtcbiAgICAgICAgc3dpcGVyUGFyYW1zLm9ic2VydmVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHN3aXBlclBhcmFtcy5vbkFueSA9IChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAgICBjb25zdCBlbWl0dGVyID0gdGhpc1tgc18ke2V2ZW50fWBdIGFzIEV2ZW50RW1pdHRlcjxhbnk+O1xuICAgICAgICBpZiAoZW1pdHRlcikge1xuICAgICAgICAgIGVtaXR0ZXIuZW1pdCguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyUGFyYW1zLm9uLCB7XG4gICAgICAgIF9jb250YWluZXJDbGFzc2VzKHN3aXBlciwgY2xhc3Nlcykge1xuICAgICAgICAgIHRoaXMuY29udGFpbmVyQ2xhc3NlcyA9IGNsYXNzZXM7XG4gICAgICAgIH0sXG4gICAgICAgIF9zbGlkZUNsYXNzZXM6IChfLCB1cGRhdGVkKSA9PiB7XG4gICAgICAgICAgdXBkYXRlZC5mb3JFYWNoKCh7IHNsaWRlRWwsIGNsYXNzTmFtZXMgfSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBwYXJzZUludChzbGlkZUVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSkgfHwgaW5kZXg7XG4gICAgICAgICAgICBpZiAodGhpcy52aXJ0dWFsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHZpcnR1YWxTbGlkZSA9IHRoaXMuc2xpZGVzLmZpbmQoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS52aXJ0dWFsSW5kZXggJiYgaXRlbS52aXJ0dWFsSW5kZXggPT09IHNsaWRlSW5kZXg7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAodmlydHVhbFNsaWRlKSB7XG4gICAgICAgICAgICAgICAgdmlydHVhbFNsaWRlLmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zbGlkZXNbc2xpZGVJbmRleF0pIHtcbiAgICAgICAgICAgICAgdGhpcy5zbGlkZXNbc2xpZGVJbmRleF0uY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBjb25zdCBzd2lwZXJSZWYgPSBuZXcgU3dpcGVyKHN3aXBlclBhcmFtcyk7XG4gICAgICBzd2lwZXJSZWYubG9vcENyZWF0ZSA9ICgpID0+IHt9O1xuICAgICAgc3dpcGVyUmVmLmxvb3BEZXN0cm95ID0gKCkgPT4ge307XG4gICAgICBpZiAoc3dpcGVyUGFyYW1zLmxvb3ApIHtcbiAgICAgICAgc3dpcGVyUmVmLmxvb3BlZFNsaWRlcyA9IHRoaXMubG9vcGVkU2xpZGVzO1xuICAgICAgfVxuICAgICAgaWYgKHN3aXBlclJlZi52aXJ0dWFsICYmIHN3aXBlclJlZi5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgICAgIHN3aXBlclJlZi52aXJ0dWFsLnNsaWRlcyA9IHRoaXMuc2xpZGVzO1xuICAgICAgICBjb25zdCBleHRlbmRXaXRoID0ge1xuICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICByZW5kZXJFeHRlcm5hbDogdGhpcy51cGRhdGVWaXJ0dWFsU2xpZGVzLFxuICAgICAgICAgIHJlbmRlckV4dGVybmFsVXBkYXRlOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgZXh0ZW5kKHN3aXBlclJlZi5wYXJhbXMudmlydHVhbCwgZXh0ZW5kV2l0aCk7XG4gICAgICAgIGV4dGVuZChzd2lwZXJSZWYub3JpZ2luYWxQYXJhbXMudmlydHVhbCwgZXh0ZW5kV2l0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybUlkKSkge1xuICAgICAgICB0aGlzLnN3aXBlclJlZiA9IHN3aXBlclJlZi5pbml0KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgaWYgKHRoaXMuc3dpcGVyUmVmLnZpcnR1YWwgJiYgdGhpcy5zd2lwZXJSZWYucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgICAgICAgIHRoaXMuc3dpcGVyUmVmLnZpcnR1YWwudXBkYXRlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgc3dpcGVyUmVmLm9uKCdzbGlkZUNoYW5nZScsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmluZGV4Q2hhbmdlLmVtaXQodGhpcy5zd2lwZXJSZWYucmVhbEluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzdHlsZTogYW55ID0gbnVsbDtcbiAgY3VycmVudFZpcnR1YWxEYXRhOiBhbnk7IC8vIFRPRE86IHR5cGUgdmlydHVhbERhdGE7XG4gIHByaXZhdGUgdXBkYXRlVmlydHVhbFNsaWRlcyA9ICh2aXJ0dWFsRGF0YTogYW55KSA9PiB7XG4gICAgLy8gVE9ETzogdHlwZSB2aXJ0dWFsRGF0YVxuICAgIGlmIChcbiAgICAgICF0aGlzLnN3aXBlclJlZiB8fFxuICAgICAgKHRoaXMuY3VycmVudFZpcnR1YWxEYXRhICYmXG4gICAgICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhLmZyb20gPT09IHZpcnR1YWxEYXRhLmZyb20gJiZcbiAgICAgICAgdGhpcy5jdXJyZW50VmlydHVhbERhdGEudG8gPT09IHZpcnR1YWxEYXRhLnRvICYmXG4gICAgICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhLm9mZnNldCA9PT0gdmlydHVhbERhdGEub2Zmc2V0KVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnN0eWxlID0gdGhpcy5zd2lwZXJSZWYuaXNIb3Jpem9udGFsKClcbiAgICAgID8ge1xuICAgICAgICAgIFt0aGlzLnN3aXBlclJlZi5ydGxUcmFuc2xhdGUgPyAncmlnaHQnIDogJ2xlZnQnXTogYCR7dmlydHVhbERhdGEub2Zmc2V0fXB4YCxcbiAgICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgICAgdG9wOiBgJHt2aXJ0dWFsRGF0YS5vZmZzZXR9cHhgLFxuICAgICAgICB9O1xuICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhID0gdmlydHVhbERhdGE7XG4gICAgdGhpcy5fYWN0aXZlU2xpZGVzLm5leHQodmlydHVhbERhdGEuc2xpZGVzKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZVNsaWRlcygpO1xuICAgICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIGlmICh0aGlzLnN3aXBlclJlZi5sYXp5ICYmIHRoaXMuc3dpcGVyUmVmLnBhcmFtcy5sYXp5WydlbmFibGVkJ10pIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYubGF6eS5sb2FkKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlZFBhcmFtczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMudXBkYXRlU3dpcGVyKGNoYW5nZWRQYXJhbXMpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHVwZGF0ZUluaXRTd2lwZXIoY2hhbmdlZFBhcmFtcykge1xuICAgIGlmICghKGNoYW5nZWRQYXJhbXMgJiYgdGhpcy5zd2lwZXJSZWYgJiYgIXRoaXMuc3dpcGVyUmVmLmRlc3Ryb3llZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXM6IGN1cnJlbnRQYXJhbXMsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIG5hdmlnYXRpb24sXG4gICAgICAgIHNjcm9sbGJhcixcbiAgICAgICAgdmlydHVhbCxcbiAgICAgICAgdGh1bWJzLFxuICAgICAgfSA9IHRoaXMuc3dpcGVyUmVmO1xuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5wYWdpbmF0aW9uKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnBhZ2luYXRpb24gJiZcbiAgICAgICAgICB0eXBlb2YgdGhpcy5wYWdpbmF0aW9uICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICAgICB0aGlzLnBhZ2luYXRpb24uZWwgJiZcbiAgICAgICAgICBwYWdpbmF0aW9uICYmXG4gICAgICAgICAgIXBhZ2luYXRpb24uZWxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ3BhZ2luYXRpb24nLCB0aGlzLnBhZ2luYXRpb24pO1xuICAgICAgICAgIHBhZ2luYXRpb24uaW5pdCgpO1xuICAgICAgICAgIHBhZ2luYXRpb24ucmVuZGVyKCk7XG4gICAgICAgICAgcGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYWdpbmF0aW9uLmRlc3Ryb3koKTtcbiAgICAgICAgICBwYWdpbmF0aW9uLmVsID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5zY3JvbGxiYXIpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuc2Nyb2xsYmFyICYmXG4gICAgICAgICAgdHlwZW9mIHRoaXMuc2Nyb2xsYmFyICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICAgICB0aGlzLnNjcm9sbGJhci5lbCAmJlxuICAgICAgICAgIHNjcm9sbGJhciAmJlxuICAgICAgICAgICFzY3JvbGxiYXIuZWxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ3Njcm9sbGJhcicsIHRoaXMuc2Nyb2xsYmFyKTtcbiAgICAgICAgICBzY3JvbGxiYXIuaW5pdCgpO1xuICAgICAgICAgIHNjcm9sbGJhci51cGRhdGVTaXplKCk7XG4gICAgICAgICAgc2Nyb2xsYmFyLnNldFRyYW5zbGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNjcm9sbGJhci5kZXN0cm95KCk7XG4gICAgICAgICAgc2Nyb2xsYmFyLmVsID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5uYXZpZ2F0aW9uKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLm5hdmlnYXRpb24gJiZcbiAgICAgICAgICB0eXBlb2YgdGhpcy5uYXZpZ2F0aW9uICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICAgICB0aGlzLm5hdmlnYXRpb24ucHJldkVsICYmXG4gICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uLm5leHRFbCAmJlxuICAgICAgICAgIG5hdmlnYXRpb24gJiZcbiAgICAgICAgICAhbmF2aWdhdGlvbi5wcmV2RWwgJiZcbiAgICAgICAgICAhbmF2aWdhdGlvbi5uZXh0RWxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ25hdmlnYXRpb24nLCB0aGlzLm5hdmlnYXRpb24pO1xuICAgICAgICAgIG5hdmlnYXRpb24uaW5pdCgpO1xuICAgICAgICAgIG5hdmlnYXRpb24udXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobmF2aWdhdGlvbi5wcmV2RWwgJiYgbmF2aWdhdGlvbi5uZXh0RWwpIHtcbiAgICAgICAgICBuYXZpZ2F0aW9uLmRlc3Ryb3koKTtcbiAgICAgICAgICBuYXZpZ2F0aW9uLm5leHRFbCA9IG51bGw7XG4gICAgICAgICAgbmF2aWdhdGlvbi5wcmV2RWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy50aHVtYnMgJiYgdGhpcy50aHVtYnMgJiYgdGhpcy50aHVtYnMuc3dpcGVyKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyKCd0aHVtYnMnLCB0aGlzLnRodW1icyk7XG4gICAgICAgIGNvbnN0IGluaXRpYWxpemVkID0gdGh1bWJzLmluaXQoKTtcbiAgICAgICAgaWYgKGluaXRpYWxpemVkKSB0aHVtYnMudXBkYXRlKHRydWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5jb250cm9sbGVyICYmIHRoaXMuY29udHJvbGxlciAmJiB0aGlzLmNvbnRyb2xsZXIuY29udHJvbCkge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi5jb250cm9sbGVyLmNvbnRyb2wgPSB0aGlzLmNvbnRyb2xsZXIuY29udHJvbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTd2lwZXIoY2hhbmdlZFBhcmFtczogU2ltcGxlQ2hhbmdlcyB8IGFueSkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5jb25maWcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCEoY2hhbmdlZFBhcmFtcyAmJiB0aGlzLnN3aXBlclJlZiAmJiAhdGhpcy5zd2lwZXJSZWYuZGVzdHJveWVkKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGFuZ2VkUGFyYW1zKSB7XG4gICAgICAgIGlmIChpZ25vcmVOZ09uQ2hhbmdlcy5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gY2hhbmdlZFBhcmFtc1trZXldPy5jdXJyZW50VmFsdWUgPz8gY2hhbmdlZFBhcmFtc1trZXldO1xuICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcihrZXksIG5ld1ZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuYWxsb3dTbGlkZU5leHQpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuYWxsb3dTbGlkZU5leHQgPSB0aGlzLmFsbG93U2xpZGVOZXh0O1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuYWxsb3dTbGlkZVByZXYpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuYWxsb3dTbGlkZVByZXYgPSB0aGlzLmFsbG93U2xpZGVQcmV2O1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuZGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLmNoYW5nZURpcmVjdGlvbih0aGlzLmRpcmVjdGlvbiwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgaWYgKHRoaXMubG9vcCAmJiAhdGhpcy5sb29wZWRTbGlkZXMpIHtcbiAgICAgICAgICB0aGlzLmNhbGNMb29wZWRTbGlkZXMoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN3aXBlclJlZi5jdXJyZW50QnJlYWtwb2ludCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnNldEJyZWFrcG9pbnQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMudGh1bWJzIHx8IGNoYW5nZWRQYXJhbXMuY29udHJvbGxlcikge1xuICAgICAgICB0aGlzLnVwZGF0ZUluaXRTd2lwZXIoY2hhbmdlZFBhcmFtcyk7XG4gICAgICB9XG4gICAgICB0aGlzLnN3aXBlclJlZi51cGRhdGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNhbGNMb29wZWRTbGlkZXMoKSB7XG4gICAgaWYgKCF0aGlzLmxvb3ApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHNsaWRlc1BlclZpZXdQYXJhbXMgPSB0aGlzLnNsaWRlc1BlclZpZXc7XG4gICAgaWYgKHRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgIGNvbnN0IGJyZWFrcG9pbnQgPSBTd2lwZXIucHJvdG90eXBlLmdldEJyZWFrcG9pbnQodGhpcy5icmVha3BvaW50cyk7XG4gICAgICBjb25zdCBicmVha3BvaW50T25seVBhcmFtcyA9XG4gICAgICAgIGJyZWFrcG9pbnQgaW4gdGhpcy5icmVha3BvaW50cyA/IHRoaXMuYnJlYWtwb2ludHNbYnJlYWtwb2ludF0gOiB1bmRlZmluZWQ7XG4gICAgICBpZiAoYnJlYWtwb2ludE9ubHlQYXJhbXMgJiYgYnJlYWtwb2ludE9ubHlQYXJhbXMuc2xpZGVzUGVyVmlldykge1xuICAgICAgICBzbGlkZXNQZXJWaWV3UGFyYW1zID0gYnJlYWtwb2ludE9ubHlQYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNsaWRlc1BlclZpZXdQYXJhbXMgPT09ICdhdXRvJykge1xuICAgICAgdGhpcy5sb29wZWRTbGlkZXMgPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gICAgICByZXR1cm4gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAgIH1cbiAgICBsZXQgbG9vcGVkU2xpZGVzID0gdGhpcy5sb29wZWRTbGlkZXMgfHwgc2xpZGVzUGVyVmlld1BhcmFtcztcblxuICAgIGxvb3BlZFNsaWRlcyArPSB0aGlzLmxvb3BBZGRpdGlvbmFsU2xpZGVzO1xuXG4gICAgaWYgKGxvb3BlZFNsaWRlcyA+IHRoaXMuc2xpZGVzLmxlbmd0aCkge1xuICAgICAgbG9vcGVkU2xpZGVzID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLmxvb3BlZFNsaWRlcyA9IGxvb3BlZFNsaWRlcztcbiAgICByZXR1cm4gbG9vcGVkU2xpZGVzO1xuICB9XG5cbiAgdXBkYXRlUGFyYW1ldGVyKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoISh0aGlzLnN3aXBlclJlZiAmJiAhdGhpcy5zd2lwZXJSZWYuZGVzdHJveWVkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBfa2V5ID0ga2V5LnJlcGxhY2UoL15fLywgJycpO1xuICAgIGNvbnN0IGlzQ3VycmVudFBhcmFtT2JqID0gaXNPYmplY3QodGhpcy5zd2lwZXJSZWYucGFyYW1zW19rZXldKTtcblxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLnN3aXBlclJlZi5tb2R1bGVzKS5pbmRleE9mKF9rZXkpID49IDApIHtcbiAgICAgIGNvbnN0IGRlZmF1bHRQYXJhbXMgPSB0aGlzLnN3aXBlclJlZi5tb2R1bGVzW19rZXldLnBhcmFtc1tfa2V5XTtcbiAgICAgIGlmIChpc0N1cnJlbnRQYXJhbU9iaikge1xuICAgICAgICBleHRlbmQodGhpcy5zd2lwZXJSZWYucGFyYW1zW19rZXldLCBkZWZhdWx0UGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnBhcmFtc1tfa2V5XSA9IGRlZmF1bHRQYXJhbXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzQ3VycmVudFBhcmFtT2JqICYmIGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgZXh0ZW5kKHRoaXMuc3dpcGVyUmVmLnBhcmFtc1tfa2V5XSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN3aXBlclJlZi5wYXJhbXNbX2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBzZXRJbmRleChpbmRleDogbnVtYmVyLCBzcGVlZD86IG51bWJlciwgc2lsZW50PzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc1N3aXBlckFjdGl2ZSkge1xuICAgICAgdGhpcy5pbml0aWFsU2xpZGUgPSBpbmRleDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnN3aXBlclJlZi5hY3RpdmVJbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMubG9vcCkge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi5zbGlkZVRvTG9vcChpbmRleCwgc3BlZWQsICFzaWxlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuc2xpZGVUbyhpbmRleCwgc3BlZWQsICFzaWxlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3dpcGVyUmVmPy5kZXN0cm95KHRydWUsIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxufVxuIl19