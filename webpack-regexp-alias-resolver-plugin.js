module.exports = class RegExpAliasResolverPlugin {
  constructor(regexp, replacement) {
    this.regexp = regexp;
    this.replacement = replacement;
  }

  /**
   *
   * @param {*} resolver
   */
  apply(resolver) {
    resolver.hooks.describedResolve.tapAsync(
      'RegExpAliasResolverPlugin',
      (request, resolveContext, callback) => {
        const originalRequestPath = request.request || request.path;
        if (!originalRequestPath) return callback();

        const match = originalRequestPath.match(this.regexp);
        if (!match) {
          return callback();
        }

        let newRequestPath = this.replacement;
        match.forEach((value, index) => {
          newRequestPath = newRequestPath.replace(
            new RegExp(`\\$${index}`, 'g'),
            value,
          );
        });

        return resolver.doResolve(
          resolver.hooks.resolve,
          {
            ...request,
            request: newRequestPath,
          },
          `request ${originalRequestPath} matched alias ${this.regexp} and was resolved to ${newRequestPath}`,
          resolveContext,
          (error, result) => {
            if (error) return callback(error);
            if (result) return callback(null, result);
            return callback();
          },
        );
      },
    );
  }
};
