use core::fmt::Debug;

pub fn set_panic_hook() {
    #[cfg(feature="console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

pub fn map_js_err<T:Debug>(err: T) -> String {
    format!("{:?}", err)
}